import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { IJob } from "./models";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
const App = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentVal, setCurrentVal] = useState<number>(0);
  //fetch jobs helper
  const fetchJobs = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setJobs(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  //fetch on load
  useEffect(() => {
    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  } //get info from job by value
  const { company, title, dates, duties } = jobs[currentVal];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setCurrentVal(index)}
                className={`job-btn ${
                  currentVal === index ? "active-btn" : null
                }`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button type="button" className="btn">
        more info
      </button>
    </section>
  );
};

export default App;
