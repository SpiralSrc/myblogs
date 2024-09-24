const AboutBlog = () => {
  return (
    <div className="w-[95%] mx-auto flex flex-col gap-10 text-[15px] xs:text-base">
      <p className="text-justify text-pretty indent-10">
        Welcome to my personal blog! I&apos;m a passionate software
        developer with a love for exploring a wide range of topics
        beyond just coding. This blog is my little corner of the
        internet where I share my thoughts, experiences, and insights
        on various subjects that pique my interest.
      </p>

      <div className="w-full flex flex-col gap-10">
        <div>
          <h3 className="font-bold text-xl mb-5">
            What You&apos;ll Find Here
          </h3>
          <p>
            While I do enjoy diving deep into the world of software
            development, you&apos;ll also find posts about:
          </p>
          <ul className="list-disc pl-20 mt-3">
            <li>
              <strong>Technology Trends:</strong> My take on the
              latest advancements and how they impact our lives.
            </li>
            <li>
              <strong>Productivity Tips:</strong> Strategies and tools
              that help me stay organized and efficient.
            </li>
            <li>
              <strong>Personal Growth:</strong> Reflections on
              self-improvement and lifelong learning.
            </li>
            <li>
              <strong>Hobbies and Interests:</strong> From books and
              movies to travel and cooking, I love sharing the things
              that bring joy to my life.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-5">
            Why I Started This Blog
          </h3>
          <p className="text-justify text-pretty indent-10">
            I believe that learning and growth happen best when we
            share our experiences and knowledge with others. This blog
            is a platform for me to do just that; whether it&apos;s a
            new coding technique, a book that inspired me, or a
            productivity hack that made a difference in my day-to-day
            life.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-5">
            Join the Conversation
          </h3>
          <p className="text-justify text-pretty indent-10">
            I hope you find something here that resonates with you.
            Feel free to leave comments, share your thoughts, and join
            the conversation. After all, the best part of any journey
            is the people you meet along the way. Thank you for
            stopping by, and I look forward to connecting with you!
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutBlog;
