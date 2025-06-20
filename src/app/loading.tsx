"use client";
import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="relative">
                <div className="absolute w-24 h-24 rounded-full border-4 border-orange-500 animate-spin" />
                <div className="absolute w-24 h-24 rounded-full border-4 border-red-500 animate-spin" style={{ animationDuration: "3s" }} />
                <div className="absolute w-24 h-24 rounded-full border-4 border-white opacity-50 animate-spin" style={{ animationDuration: "2s" }} />
                <div className="absolute w-24 h-24 rounded-full border-4 border-sky-500 opacity-80 animate-spin" style={{ animationDuration: "1s" }} />
            </div>
        </div>
    );
};

export default Loader;
