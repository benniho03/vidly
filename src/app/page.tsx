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
        </div>

        <div className="background mb-0 ">
          <div className="background-bg bg-white"></div>
          <h2 className="text-black">The solution: vidly</h2>
          <p className="text-black">Our solution is designed to provide creators with data-based tips and assistance on how they can improve factors that influence the algorithm in their own videos in order to potentially rank better on the platform.
            Creators can find helpful tips for their videos on the Gardening, Research and AI Helper page.</p>
        </div>

        <div className="background mb-0">
          <div className="background-bg bg-lime-950"></div>
          <div className="two-column flex space-x-4">
            <div className="column-one">
              <h2>Gardening</h2>
              <p>Are you interested in the topic of gardening? Do you produce video content on this topic? Have you always wanted to know when the best time is to upload a video on this topic so that it gets lots of clicks? You can find all the relevant information on the Gardening page. </p>
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
              <p>Or would you like information on another topic? Then the research page is the right place for you! Search for any topic and you will be shown various existing videos. Of course, you will also be shown information on the optimum upload time. Take a look.</p>
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