const Terms = () => {
  return (
    <div className="w-full flex flex-col gap-3 px-2 text-sm">
      <h3 className="text-xl font-medium text-center">
        Terms and Conditions
      </h3>
      <div className="mt-5">
        <span className="italic">
          By creating an account on my website, you agree to abide by
          the following terms and conditions, which include but are
          not limited to:
        </span>
        <ol className="list-decimal mt-5 space-y-2 text-justify text-pretty">
          <li>
            Only registered users are allowed to comment or like posts
            on the website
          </li>
          <li>
            Users are responsible for maintaining the confidentiality
            of their account information and are not permitted to
            share their login credentials with others.
          </li>
          <li>
            User data are not being sold or shared with third parties
            for illegal purposes. User information is only used for
            the purpose of providing services on the website.
          </li>
          <li>
            Users are prohibited from posting any content that is
            illegal, defamatory, or infringes on the rights of others.
          </li>
          <li>
            Reserved the right to remove any content or suspend
            accounts that violate these terms and conditions.
          </li>
        </ol>
      </div>
    </div>
  );
};
export default Terms;
