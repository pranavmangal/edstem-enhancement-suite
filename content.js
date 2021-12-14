const codeToNameMap = {
  "COMP 60001": "Advanced Architecture",
  "COMP 60008": "Custom Computing",
  "COMP 60020": "Simulation and Modelling",
  "COMP 70001": "Advanced Computer Graphics",
  "COMP 70004": "Advanced Computer Security",
  "COMP 70005": "Complexity",
  "COMP 70006": "Computational Finance",
  "COMP 70007": "Computational Optimization",
  "COMP 70008": "Concurrent Processes",
  "COMP 70009": "Cryptography Engineering",
  "COMP 70010": "Deep Learning",
  "COMP 70011": "Individual Project MEng",
  "COMP 70015": "Mathematics for ML",
  "COMP 70016": "Natural Language Processing",
  "COMP 70017": "Principles of Distributed Ledgers",
  "COMP 70018": "Privacy Engineering",
  "COMP 70019": "Probablistic Inference",
  "COMP 70020": "Program Analysis",
  "COMP 70022": "Scalable Systems and Data",
  "COMP 70023": "Scalable Software Verification",
  "COMP 70024": "Software Reliability",
  "COMP 70025": "Software Engineering for Industry",
  "COMP 70028": "Reinforcement Learning",
  "COMP 70030": "Knowledge Representation",
  "COMP 70031": "Modal Logic for Strategic Reasoning in AI",
  "COMP 70066": "Decentralised Finance",
  "COMP 70067": "Robot Learning and Control",
  "COMP 70068": "Scheduling & Resource Alloc",
};

const expandButtonSelector = "span.sbi-content";
const courseTabSelector = "span.sbi-content";

const buttonObserver = new MutationObserver(function (mutations, observer) {
  for (const _ of mutations) {
    for (let tab of document.querySelectorAll(expandButtonSelector)) {
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
    if (document.querySelector(courseTabSelector)) {
      Object.values(document.querySelectorAll(courseTabSelector)).map(
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
