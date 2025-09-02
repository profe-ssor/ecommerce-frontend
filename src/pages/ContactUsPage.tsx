import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const ContactUsPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Integrate with backend/email service
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff1f1] via-white to-[#fff1f1] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-buttershine">Contact Us</h2>
          <p className="text-gray-600 mb-6">Have a question, feedback, or need help? Fill out the form below and our team will get back to you as soon as possible.</p>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6 text-center">
              Thank you for contacting us! We'll get back to you soon.
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your message here..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
        {/* Company Info */}
        <div className="flex-1 flex flex-col gap-6 justify-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Information</h3>
            <div className="flex items-center gap-3 mb-2 text-gray-700">
              <Mail className="text-primary" /> support@oskobuys.com
            </div>
            <div className="flex items-center gap-3 mb-2 text-gray-700">
              <Phone className="text-primary" /> +1 (555) 123-4567
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="text-primary" /> Osko Buys, Old Ashongman Accra
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-[#074786] hover:text-[#ff272a] transition-colors"><Facebook size={24} /></a>
              <a href="#" className="text-[#074786] hover:text-[#ff272a] transition-colors"><Twitter size={24} /></a>
              <a href="#" className="text-[#074786] hover:text-[#ff272a] transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-[#074786] hover:text-[#ff272a] transition-colors"><Youtube size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage; 