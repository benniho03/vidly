import { Card } from '@tremor/react';

export default function Home() {
  return (
    <div>
      <div className="hero">
        <img src="/assets/hero-home.jpg" />
      </div>
      <div className="container mx-auto px-20 ">
        <div className="background mb-0">
          <div className="background-bg bg-slate-900"></div>
          <h1>THE YOUTUBE ALGORITHM </h1>
          <h2>EVERYBODY KNOWS HIM</h2>
          <h2>SOME FEAR HIM</h2>
          <h2 >HARDLY ANYONE UNDERSTANDS HIM</h2>
          <p mt-10>The profession of content creator has become much more popular in recent years, with many more videos appearing on the YouTube platform every day than just a few years ago. Creators, who earn their living from the platform, are heavily dependent on the clicks on their videos, but due to the increased competition and the algorithm used by YouTube, it is becoming increasingly difficult to get many users interested in your own video.</p>
          <div className="keyfacts">
          <div className="number-facts grid grid-cols-3 gap-4">

            <div className="number-facts-item">
            <p className="content">2,491 Bn.</p >
            <p className="content-title">users</p>
            <p className='content-small'>per month</p>
            </div>
            <div className="number-facts-item">
            <p className="content">720.000</p >
            <p className="content-title">hours</p>
            <p className='content-small'>Videomaterial per day</p>
            </div>
            <div className="number-facts-item">
            <p className="content">300 Mio.</p >
            <p className="content-title">dollar </p>
            <p className='content-small'>were generated in advertising revenue from all YouTube combined in 2021</p>
            </div>
          </div>
          </div>
        </div>

        <div className="background mb-0 ">
          <div className="background-bg bg-white"></div>
          <h2 className="text-black">The solution: vidly</h2>
          <p className="text-black">Our product provides content creators with the ability to analyze videos in their niche using data-driven insights and display the most critical information in an easy-to-understand format. With our AI Helper, they can even test the success potential of their video ideas before publication. All our analyses and predictions are based on real-time data directly from YouTube.</p>
        </div>

        <div className="background mb-0">
          <div className="background-bg bg-lime-950"></div>
          <div className="two-column flex space-x-4">
            <div className="column-one">
              <h2>Gardening</h2>
              <p>Discover the valuable insights that can be obtained from the YouTube API. Using the example of the gardening niche, we provide you with fascinating graphics and information to help you analyze your content.

Want to know what the API offers, the optimal time to publish your videos, or the ideal length for your titles? You're in the right place.</p>
              <a href="/gardening">
                <button type="button" className="text-white bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700">more</button>
              </a>
            </div>
            <div className="column-two">
              <img src="/assets/gardening-image-2.jpg" />
            </div>
          </div>
        </div>

        <div className="background mb-0">
          <div className="background-bg bg-neutral-700"></div>
          <div className="two-column flex space-x-4">
            <div className="column-one">
              <h2>Research</h2>
              <p>Would you prefer real-time information on a topic of your choice? Then our Research page is the perfect place for you. Enter your topic in the search bar and explore the best videos and informative graphics related to it.</p>
              <a href="/research">
                <button type="button" className="text-white bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700">more</button>
              </a>
            </div>
            <div className="column-two">
              <img src="/assets/research-image-2.jpg" />
            </div>
          </div>
        </div>

        <div className="background mb-0">
          <div className="background-bg bg-indigo-950"></div>
          <div className="two-column flex space-x-4">
            <div className="column-one">
              <h2>KI-Helper</h2>
              <p>You have created your video. Now you want to know how many likes, comments and views your video will get? Then take a look at our AI Helper! Simply enter your video information, such as title, description and so on, and we'll show you how successful your video can be.</p>
              <a href="/ki-helper">
                <button type="button" className="text-white bg-fuchsia-800 hover:bg-fuchsia-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-fuchsia-800 dark:hover:bg-fuchsia-500 dark:focus:ring-gray-700 dark:border-gray-700">more</button>
              </a>
            </div>
            <div className="column-two">
              <img src="/assets/ki-image-2.jpg" />
            </div>
          </div>
        </div>




      </div>

    </div>
  );
}