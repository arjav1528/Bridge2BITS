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
    <div className="w-full relative">
        {/* Marquee Container with Dark Theme */}
        <div className="w-full overflow-hidden">
            <Marquee
                speed={40}
                gradient={true}
                gradientColor="black"    
                pauseOnHover={true}
                direction="left"
                className="py-8 bg-transparent flex items-center space-x-6 overflow-hidden"
            >
                {testimonials.map(({ id, pfpUrl, name, text, college }) => (
                    <div key={id} className="flex flex-col mx-4 p-6 bg-gray-900 rounded-2xl shadow-lg border-2 border-yellow-400 w-80 h-64 hover:shadow-xl hover:shadow-yellow-400/20 transition-all duration-300 hover:scale-105">
                        {/* Header with profile image and name */}
                        <div className="flex items-center space-x-3 mb-4">
                            <img 
                                src={pfpUrl} 
                                alt={`${name}'s profile`} 
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0 shadow-md" 
                            />
                            <div className="flex flex-col">
                                <p className="font-bold text-white text-base">{name}</p>
                                <p className="text-gray-300 text-sm">{college}</p>
                            </div>
                        </div>
                        
                        {/* Testimonial text */}
                        <div className="flex-1 flex items-start">
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                                {text}
                            </p>
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    </div>
)