import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEBFORM_EMAIL_API_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        event.target.reset();
      } else {
        console.error("Error", data);
        setResult(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setResult("Submission failed. Please try again.");
    }
  };

  return (
    <div className='contactContainer'>
      <div className="topBlur"></div>
      <div className="bottomBlur"></div>
      <h1>Let's get in touch!</h1>
      <p>
        Got any questions about Fotolab?
        <br></br>
        Feel free to email: carlahau110@gmail.com
      </p>

      {result && result !== "Sending...." ? (
        <>
          <p>{result}</p>
          <p>Thanks for reaching out! I'll get back to you as soon as I can!</p>
        </>
      ) : result === "Sending...." ? (
          <span>Sending...</span>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="inputs">
            <input type="text" name="name" placeholder='Your Name' required />
            <input type="email" name="email" placeholder='Your Email' required />
            <textarea name="message" placeholder='Your Message' required></textarea>
          </div>
          <button type="submit">Submit Form</button>
        </form>
      )}
    </div>
  );
}

export default Contact;