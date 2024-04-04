import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons
import { colors } from '../../colors';

export default function Frequentlyaskedquestions() {
    const [faqs, setFaqs] = useState([
        { question: 'How to book a tour?', answer: 'To book a tour, you can visit our website and follow the steps provided in the booking section.', isOpen: false },
        { question: 'How to cancel a tour?', answer: 'To cancel a tour, you need to contact our customer support team and follow their instructions.', isOpen: false },
        { question: 'How to set a payment as a default?', answer: 'To set a payment method as default, you can navigate to your account settings and choose the default payment method option.', isOpen: false },
        { question: 'Where are customer services?', answer: 'Our customer services are available 24/7. You can reach us through email, phone, or live chat on our website.', isOpen: false },
        { question: 'How to change my password?', answer: 'To change your password, log in to your account, go to settings, and select the change password option.', isOpen: false },
        { question: 'What are the payment methods?', answer: 'We accept various payment methods including credit/debit cards, PayPal, and bank transfers. You can choose the most convenient option for you.', isOpen: false },
        { question: 'How to pay with Paypal?', answer: 'To pay with PayPal, select the PayPal option at checkout and follow the instructions to complete the payment process.', isOpen: false },
        { question: 'How to see booking details?', answer: 'You can view your booking details by logging in to your account and navigating to the bookings section. All your bookings will be listed there along with the relevant details.', isOpen: false },
        { question: 'Why should I put my birthday?', answer: 'Providing your birthday helps us personalize your experience and send you special offers on your special day.', isOpen: false },
        { question: 'What is the free cancellation policy?', answer: 'Our free cancellation policy allows you to cancel your booking within a certain period without any penalty. Please refer to our terms and conditions for more details.', isOpen: false },
        // Add more FAQ items here
    ]);

    const toggleFAQ = (index) => {
        const newFaqs = [...faqs];
        newFaqs[index].isOpen = !newFaqs[index].isOpen;
        setFaqs(newFaqs);
    };

    return (
        <>
            <Navbar />
            <div className='container-fluid w-75'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2 className='fw-bold fs-1 text-center my-4'>Frequently asked questions</h2>
                    </div>
                    {faqs.map((faq, index) => (
                        <div className='col-md-6' key={index}>
                            <div className='card shadow' style={{cursor:'pointer'}}>
                                <div className='card-body'>
                                    <div className='d-flex justify-content-between' onClick={() => toggleFAQ(index)}>
                                        <h4>{faq.question}</h4>
                                        {faq.isOpen ? <FaChevronUp style={{color:colors.secondary}}/> : <FaChevronDown style={{color:colors.secondary}}/>}
                                    </div>
                                    {faq.isOpen && <p>{faq.answer}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
