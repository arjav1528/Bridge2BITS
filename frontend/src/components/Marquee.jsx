import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";


const testimonials = [
    {
        id: 1,
        pfpUrl: "https://i.imgur.com/1z5b7aH.png",
        name: "John Doe",
        text: "This is an amazing product! Highly recommend it to everyone.",
        college: "Harvard University",
    },
    {
        id: 2,
        pfpUrl: "https://i.imgur.com/2z5b7aH.png",
        name: "Jane Smith",
        text: "Absolutely love it! The quality is top-notch.",
        college: "Stanford University",
    },
    {
        id: 3,
        pfpUrl: "https://i.imgur.com/3z5b7aH.png",
        name: "Alice Johnson",
        text: "A game changer in the industry. Will definitely use it again.",
        college: "MIT",
    },
    {
        id: 4,
        pfpUrl: "https://i.imgur.com/4z5b7aH.png",
        name: "Bob Brown",
        text: "Fantastic service and support. Couldn't be happier!",
        college: "University of California, Berkeley",
    },
    { id: 5,
        pfpUrl: "https://i.imgur.com/5z5b7aH.png",
        name: "Charlie Green",
        text: "The best experience I've had with any product. Highly satisfied.",
        college: "Yale University",
    },
    { id: 6,
        pfpUrl: "https://i.imgur.com/6z5b7aH.png",
        name: "Diana White",
        text: "Incredible value for money. Will recommend to all my friends.",
        college: "Princeton University",
    },
    { id: 7,
        pfpUrl: "https://i.imgur.com/7z5b7aH.png",
        name: "Ethan Black",
        text: "A revolutionary product that has changed my life for the better.",
        college: "Columbia University",
    },
    { id: 8,
        pfpUrl: "https://i.imgur.com/8z5b7aH.png",
        name: "Fiona Blue",
        text: "Exceptional quality and performance. Exceeded my expectations.",
        college: "University of Chicago",
    },
    { id: 9,
        pfpUrl: "https://i.imgur.com/9z5b7aH.png",
        name: "George Red",
        text: "An outstanding product that delivers on its promises.",
        college: "California Institute of Technology",
    },
];


export const MarqueeSection = () => (
    <div className="mt-16 mb-8 relative">
        {/* Section Title */}
        <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                What Our Community Says
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Hear from fellow BITS students who've transformed their tech journey with us
            </p>
        </motion.div>
        
        {/* Marquee Container with Dark Theme */}
        <div className="marquee-full-width">
            <div className="marquee-fade-overlay marquee-fade-left"></div>
            <div className="marquee-fade-overlay marquee-fade-right"></div>
            
            <Marquee
                speed={40}
                gradient={false}
                pauseOnHover={true}
                direction="left"
                className="py-8 bg-transparent flex items-center space-x-6 overflow-hidden"
            >
                {testimonials.map(({ id, pfpUrl, name, text, college }) => (
                    <div key={id} className="flex items-start space-x-4 mx-4 p-6 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 min-w-80 max-w-96 hover:shadow-blue-500/20 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                        <img 
                            src={pfpUrl} 
                            alt={`${name}'s profile`} 
                            className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-blue-500/30 shadow-lg" 
                        />
                        <div className="flex flex-col space-y-3">
                            <p className="text-gray-300 text-base leading-relaxed font-medium">
                                "{text}"
                            </p>
                            <p className="font-bold text-white text-base">{name}</p>
                            <p className="text-blue-400 text-sm font-medium bg-blue-500/10 px-3 py-1 rounded-full inline-block">
                                {college}
                            </p>
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    </div>
)