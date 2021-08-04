//Niko Icardo 7/31/2021
import React, { useState } from 'react'; 

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function encode(data) {
    return Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    fetch('/', {
      method: 'POST', 
      headers: {'Content-Type': 'application/x-www-form-urlencoded' }, 
      body: encode({'form-name': 'contact', name, email, message}),
    })
    .then(() => alert('Message Sent!'))
    .catch((error) => alert(error));
  }

  return (
    <section id="contact" className=" w-full flex flex-col
     justify-startv">
      <div>
      <h2 className="text-center text-white sm:text-4xl text-3xl mb-4 font-medium title-font">
            Contact Me
      </h2>
      <p className="text-center leading-relaxed mb-5">
        Feel free to reach out to me by filling out the contact form below!
      </p>
      </div>
      <div className=" text-left mx-24">
        <form 
          netlify
          name="contact"
          onSubmit={handleSubmit}
          className="lg:w-full md:w-full flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
        >
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-400">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}; 

export default Contact; 