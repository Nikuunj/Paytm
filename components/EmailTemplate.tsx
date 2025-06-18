import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  otp: number;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  otp,
}) => {
  return (
     <div className="flex flex-col justify-center items-center">
          <h1>Welcome, {firstName}!</h1>
          <p>Your verification code is:</p>
          <h2>{otp}</h2>
     </div>
  );
};

export default EmailTemplate;
