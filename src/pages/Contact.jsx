const Contact = () => {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600">Have any questions? Feel free to reach out to us!</p>
        <form className="mt-6">
          <input
            type="text"
            placeholder="Your Name"
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="block w-full p-2 border rounded mb-4"
          />
          <textarea
            placeholder="Your Message"
            className="block w-full p-2 border rounded mb-4"
            rows="4"
          ></textarea>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>
    );
  };
  
  export default Contact;
  