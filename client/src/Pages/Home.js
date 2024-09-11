
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = function () {
  return (
    <>
      {/* credit: https://github.com/codebushi/gatsby-starter-lander */}
      <div>

        <main className="text-gray-900 ">
          
        <section className="pt-20 md:pt-32 lg:pt-40">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center">
              <div className="text-center lg:text-left lg:w-1/2 lg:pr-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Vote Hub
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mt-4 md:mt-6 lg:mt-8 font-light">
                VoteHub makes voting simple and secure with its online platform. From the comfort of home, users can easily register, cast their votes, and view real-time results. With top-notch security to protect voter information, VoteHub ensures a trustworthy and accessible voting experience, empowering citizens to shape their communities and participate in the democratic process effortlessly.
                </p>
                <p className="mt-6 md:mt-8">
                  <Link to="/login">
                    <button
                      type="button"
                      className="py-3 px-8 md:py-4 md:px-12 bg-teal-500 hover:bg-teal-600 rounded text-white text-sm md:text-base"
                    >
                      Get Started
                    </button>
                  </Link>
                </p>
                <p className="mt-4 text-gray-600">
                  Play your Role in Voting
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:w-1/2">
                <img
                  src="./images/voting3.webp"
                  alt="Cryptocurrency"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>
          <section id="features" className="py-20 lg:pb-40 lg:pt-48">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl lg:text-5xl font-semibold">
                How It Works?
              </h2>
              <div className="flex flex-col  sm:flex-row sm:-mx-3 mt-12">
                <div className="flex-1 px-3">
                  <div
                    className="p-12 rounded-lg bg-white border border-solid border-gray-200 mb-8"
                    style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
                  >
                    <p className="font-semibold text-xl text-blue-600">Register/Login</p>
                    <p className="mt-4">
                      Register/Login with your VoterId number , password and OTP
                    </p>
                  </div>
                </div>
                <div className="flex-1 px-3">
                  <div
                    className="p-12 rounded-lg border border-solid bg-white border-gray-200 mb-8"
                    style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
                  >
                    <p className="font-bold text-xl text-green-600">Vote</p>
                    <p className="mt-4">
                    Cast Your Vote and Shape the Future of Our Nation – Your Voice Matters!
                    </p>
                  </div>
                </div>
                <div className="flex-1 px-3">
                  <div
                    className="p-12 rounded-lg border border-solid bg-white border-gray-200 mb-8"
                    style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
                  >
                    <p className="font-bold text-xl text-red-600">Results</p>
                    <p className="mt-4">
                    View Real-Time Results and Witness Your Impact on the Election – Every Vote Counts!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
export default Home;