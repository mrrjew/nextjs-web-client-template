import React from "react";

const services = [
  {
    id: "01",
    title: "Rommate Feature",
    desc: "Simplify shared living by easily splitting payments for both long-term and short-term accommodations. Our innovative feature ensures that managing shared expenses is straightforward and secure.",
    Detail: "Learn More",
    // circleColor: "#4D46C7"
  },
  {
    id: "02",
    title: "Hourly Place Service",
    desc: "Need a space for a short while? Our service provides flexible rental options for individual rooms, parking spots, and even restrooms, catering to your immediate needs.",
    Detail: "Learn More",
    // circleColor: "#EE2A52"
  },
  {
    id: "03",
    title: "Last-Minute Deals",
    desc: "Spontaneous plans? Get access to exclusive last-minute deals on flights and hotels, making last-minute travel affordable and exciting.",
    Detail: "Learn More",
    // circleColor: "#FAB33F"
  },
  {
    id: "04",
    title: "Hourly Rental Service",
    desc: "Access a variety of spaces and equipment on an hourly basis. From meeting rooms and workspaces to recreational vehicles, find the right resources at the right time, without the hassle of long-term commitments.",
    Detail: "Learn More",
    // circleColor: "#646670"
  },
  {
    id: "05",
    title: "How We Do It",
    desc: "Our platform focuses on user convenience with easy browsing and booking,  even without logging in. For financial transactions like our Roommate  feature, we prioritize security and trust with user logins.",
    Detail: "Learn More",
    // circleColor: "#666666"
  },
];

const AboutUsWork = () => {
  return (
    <div className="lg:h-[1000px] p-5 pt-5 pb-5 mx-20 bg-slate-100">
      <div className="text-center mt-5 ">
        <h1 className="text-2xl font-semibold">What We Do</h1>
        <p className="mt-3">
          Pace Dream offers a comprehensive range of services designed to meet
          the needs of modern, <br />
          mobile, and diverse lifestyles:
        </p>
      </div>
      <div className="lg:grid grid-cols-3 gap-3 m-auto mt-3 p-4 sm:grid-col-2 text-center px-[50px]">
        {services.slice(0, 3).map((service) => (
          <div
            key={service.title}
            className="bg-white h-[380px] w-[300px] text-center p-5 rounded-xl mt-2"
          >
            <h3 className="text-left text-2xl ml-5 h-5 font-bold">
              {service.id}
            </h3>
            {/* <div className={`absolute w-6 h-6 rounded-full ${service.circleColor} -top-2 -left-2 flex justify-center items-center`}>
                            <span className="text-black font-bold">{service.id}</span>
                </div> */}
            <br />
            <h4 className="text-xl text-left mt-2 ml-4 font-semibold h-3">
              {service.title}
            </h4>
            <br />
            <p className="text-base text-left px-4 h-15">{service.desc}</p>
            <br />
            <h6 className="text-base text-left ml-4 font-medium h-8">
              {service.Detail} &rarr;{" "}
            </h6>
          </div>
        ))}
      </div>
      <div className="lg:flex gap-56 ms-48 mt-3 p-4 sm:grid-col-2 text-center px-[50px]">
        {services.slice(3).map((service) => (
          <div
            key={service.title}
            className="bg-white h-[380px] w-[300px] text-center p-5 rounded-xl mt-2"
          >
            <h3 className="text-left text-2xl h-5 font-bold">{service.id}</h3>
            {/* <div className={`absolute w-6 h-6 rounded-full ${service.circleColor} -top-2 -left-2 flex justify-center items-center`}>
                            <span className="text-black font-bold">{service.id}</span>
                        </div> */}
            <br />
            <h4 className="text-xl text-left mt-2 ml-4 font-semibold h-3">
              {service.title}
            </h4>
            <br />
            <p className="text-base text-left px-4 h-15">{service.desc}</p>
            <br />
            <h6 className="text-base text-left ml-4 font-medium h-8">
              {service.Detail} &rarr;{" "}
            </h6>
          </div>
        ))}
      </div>
    </div>
    // <div className='lg:h-[800px] p-5 pt-5 pb-5  bg-slate-100'>
    //     <div className='text-center mt-5 '>
    //         <h1 className="text-2xl font-semibold">What We Do</h1>
    //         <p className='mt-3'>Pace Dream offers a comprehensive range of services designed to meet the needs of modern, <br />
    //             mobile, and diverse lifestyles:</p>
    //     </div>
    //     <div className="lg:grid grid-cols-3 gap-3 m-auto mt-3 p-4 sm:grid-col-2 text-center px-[50px]">
    //         {services.map((service) => (
    //             <div className='bg-white h-[330px] w-[300px] text-center p-5 rounded-xl mt-2'>
    //             <h3 className='text-left text-2xl h-2 font-bold'>{service.id}</h3>
    //             <br />
    //             <h4 className='text-xl font-semibold h-3'>{service.title}</h4>
    //             <br />
    //             <p className='text-base text-left h-15'>{service.desc}</p>
    //             <br />
    //             <h6 className='text-base text-left font-medium h-16'>{service.Detail} &rarr; </h6>
    //         </div>
    //         ))}
    //     </div>
    // </div>
  );
};

export default AboutUsWork;
