const codeToNameMap = {
  "COMP 60001": "Advanced Architecture",
  "COMP 60020": "Simulation and Modelling",
  "COMP 70004": "Advanced Computer Security",
  "COMP 70005": "Complexity",
  "COMP 70006": "Computational Finance",
  "COMP 70008": "Concurrent Processes",
  "COMP 70011": "Individual Project MEng",
  "COMP 70015": "Mathematics for ML",
  "COMP 70018": "Privacy Engineering",
  "COMP 70020": "Program Analysis",
  "COMP 70022": "Scalable Systems and Data",
  "COMP 70023": "Scalable Software Verification",
  "COMP 70028": "Reinforcement Learning",
  "COMP 70068": "Scheduling & Resource Alloc",
};

const buttonObserver = new MutationObserver(function (mutations, observer) {
  for (const _ of mutations) {
    for (let tab of document.querySelectorAll("span.dsbi-content")) {
      if (tab.innerText.includes("more")) {
        // Expand to show all courses
        tab.click();
        observer.disconnect();
      }
    }
  }
});

const coursesObserver = new MutationObserver(function (mutations) {
  for (const _ of mutations) {
    // Replace course codes with names in the sidebar
    if (document.querySelector("span.dsbi-content")) {
      Object.values(document.querySelectorAll("span.dsbi-content")).map(
        (course) => {
          if (course.innerText in codeToNameMap) {
            course.innerText = codeToNameMap[course.innerText];
          }
        }
      );
    }
  }
});

const observerConfig = {
  childList: true,
  subtree: true,
};

// Start observing the target nodes for configured mutations
buttonObserver.observe(document.body, observerConfig);
coursesObserver.observe(document.body, observerConfig);
