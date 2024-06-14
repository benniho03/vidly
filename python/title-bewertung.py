import pandas as pd
from textblob import TextBlob
from sklearn.model_selection import train_test_split
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
import torch
from connect import get_all_videos

# Überprüfen, ob ROCm verfügbar ist
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Daten abrufen
videos = get_all_videos()

# Tokenisierung und Berechnung zusätzlicher numerischer Werte
videos['title_length'] = videos['title'].apply(len)
videos['title_word_count'] = videos['title'].apply(lambda x: len(x.split()))
# videos['des_length'] = videos['description'].apply(len)  # Auskommentiert
# videos['des_word_count'] = videos['description'].apply(lambda x: len(x.split()))  # Auskommentiert
videos['caption'] = videos['caption'].apply(lambda x: 0 if len(x) == 0 else 1)

# Tokenisierung der Titel und Beschreibungen
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
videos['title_tokens'] = videos['title'].apply(lambda x: tokenizer.encode(x, add_special_tokens=True, max_length=512, truncation=True))
# videos['description_tokens'] = videos['description'].apply(lambda x: tokenizer.encode(x, add_special_tokens=True, max_length=512, truncation=True))  # Auskommentiert

# Auswahl der relevanten Features und Zielvariablen
features = ['title_tokens', 'title_length', 'title_word_count', 'caption']  # 'description_tokens', 'des_length', 'des_word_count' entfernt
target = ['likeCount', 'commentCount', 'viewCount']

# Aufteilen der Daten in Trainings- und Testsets
train_df, test_df = train_test_split(videos, test_size=0.2, random_state=42)

class YouTubeDataset(torch.utils.data.Dataset):
    def __init__(self, dataframe, tokenizer, max_len):
        self.tokenizer = tokenizer
        self.data = dataframe
        self.max_len = max_len

    def __len__(self):
        return len(self.data)

    def __getitem__(self, index):
        row = self.data.iloc[index]
        title_tokens = row['title_tokens']
        # description_tokens = row['description_tokens']  # Auskommentiert
        title_length = row['title_length']
        title_word_count = row['title_word_count']
        # des_length = row['des_length']  # Auskommentiert
        # des_word_count = row['des_word_count']  # Auskommentiert
        caption = row['caption']
        labels = torch.tensor([row['likeCount'], row['commentCount'], row['viewCount']], dtype=torch.float)

        input_ids = title_tokens  # + description_tokens  # Auskommentiert
        input_ids = input_ids[:self.max_len] + [0] * (self.max_len - len(input_ids))
        attention_mask = [1] * len(input_ids)

        return {
            'input_ids': torch.tensor(input_ids, dtype=torch.long),
            'attention_mask': torch.tensor(attention_mask, dtype=torch.long),
            'title_length': torch.tensor(title_length, dtype=torch.float),
            'title_word_count': torch.tensor(title_word_count, dtype=torch.float),
            # 'des_length': torch.tensor(des_length, dtype=torch.float),  # Auskommentiert
            # 'des_word_count': torch.tensor(des_word_count, dtype=torch.float),  # Auskommentiert
            'caption': torch.tensor(caption, dtype=torch.float),
            'labels': labels
        }

# Dataset erstellen
train_dataset = YouTubeDataset(train_df, tokenizer, max_len=512)
test_dataset = YouTubeDataset(test_df, tokenizer, max_len=512)

# DataLoader optimieren
train_dataloader = torch.utils.data.DataLoader(train_dataset, batch_size=8, shuffle=True, num_workers=4, pin_memory=True)
test_dataloader = torch.utils.data.DataLoader(test_dataset, batch_size=8, shuffle=False, num_workers=4, pin_memory=True)

# Modell initialisieren und auf GPU-Gerät verschieben
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3).to(device)

# Trainingsargumente definieren
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
    fp16=True,  # Mixed Precision Training aktivieren
)

# Trainer initialisieren
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
)

# Modell trainieren
trainer.train()

def predict_performance(title, description):
    inputs = tokenizer(title, description, return_tensors='pt', max_length=512, truncation=True, padding='max_length')
    inputs = {key: value.to(device) for key, value in inputs.items()}  # Auf GPU-Gerät verschieben
    inputs['title_length'] = torch.tensor([len(title)], dtype=torch.float).to(device)
    inputs['title_word_count'] = torch.tensor([len(title.split())], dtype=torch.float).to(device)
    # inputs['des_length'] = torch.tensor([len(description)], dtype=torch.float).to(device)  # Auskommentiert
    # inputs['des_word_count'] = torch.tensor([len(description.split())], dtype=torch.float).to(device)  # Auskommentiert
    inputs['caption'] = torch.tensor([0], dtype=torch.float).to(device)  # Beispielwert
    outputs = model(**inputs)
    predictions = outputs.logits.detach().cpu().numpy()
    return predictions

title = "Top 10 Flowers for the Garden"
description = "The best 10 Flowers you can use in your Garden to create a natural atmosphere"
performance_prediction = predict_performance(title, description)
print("Performance Prediction:", performance_prediction)