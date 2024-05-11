import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';

import "./ScrollBar.css";
import { PiStarFourFill } from "react-icons/pi";

export const CustomKanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <h1 className="text-xl font-bold mb-2 text-neutral-200">Your Job Board</h1>
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState([]);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    hasChecked && localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    const cardData = localStorage.getItem("cards");

    // setCards(cardData ? JSON.parse(cardData) : [DEFAULT_CARDS_JSON]);
    setCards(cardData ? JSON.parse(cardData) : DEFAULT_CARDS);
    // console.log(cardData);
    // console.log(DEFAULT_CARDS_JSON);

    setHasChecked(true);
  }, []);

  return (
    <div className="flex h-full w-full gap-3 p-4 rounded">
      <Column
        title="Wishlist"
        column="wishlist"
        headingColor="text-neutral-300"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Applied"
        column="applied"
        headingColor="text-orange-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Interviewing"
        column="interviewing"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Offer"
        column="offer"
        headingColor="text-green-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Rejected"
        column="rejected"
        headingColor="text-red-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} cards={cards} />
    </div>
  );
};

const Column = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };


  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-48 shrink-0 overflow-y-scroll overflow-x-hidden relative custom-scrollbar pr-1">
      <div className="mb-3 flex items-center justify-between sticky top-0 bg-neutral-900">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          !active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        {/* <AddCard column={column} setCards={setCards} /> */}
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart }) => {
  // set isOfferCol "true" if column === 'offer'
  const [isOfferCol, setOfferCol] = useState(column == 'offer' ? true : false);

  const navigate = useNavigate();

  const toComponentB=()=>{
    navigate('/predict',{state:{id,title}});
  }

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm font-semibold text-neutral-100">{title}</p>
        {/* <p className="text-xs text-neutral-100">{company}</p> */}

        <div className="flex w-full justify-end">
          {isOfferCol
            ? 
              // <div> <a onClick={()=>{toComponentB()}}>Component B</a></div> 
                <button
                  onClick={()=>{toComponentB()}}
                  type="submit"
                  className="flex items-center gap-1.5 rounded px-2 py-1.5 mt-2 text-xs border-violet-400 bg-violet-400/20 text-neutral-50 transition-colors hover:bg-violet-400/50"
                >

              <PiStarFourFill />
              <span>Predict</span>
            </button>
            :
              ""
          }
        </div>


        
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards, cards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    // setCards((pv) => pv.filter((c) => c.id !== cardId));
    // setActive(false);


    setActive(false);

    const before = "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      const column = "wishlist"
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      console.log(copy)

      setCards(copy);
    }
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-48 w-48 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  // const [company, setCompany] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text,
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
            <div
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            >
              <input
              required
              onChange={(e) => setText(e.target.value.trim().split(" ").map((word) => {
                return word[0].toUpperCase() + word.substring(1);
                }).join(" ") // Capitalize Each First Aplhabet
              )}
              autoFocus
              placeholder="Add job title..."
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
            <div className="mt-1.5 flex items-center justify-end gap-1.5"></div>
            {/* <input
              required
              onChange={(e) => setCompany(e.target.value.trim().split(" ").map((word) => {
                return word[0].toUpperCase() + word.substring(1);
                }).join(" ")
              )}
              placeholder="Add company name..."
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            /> */}
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
            </div>

            <div
              className="flex justify-end gap-1.5"
            >
              <div
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50 cursor-pointer"
              >
                Close
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add</span>
                <FiPlus />
              </button>
            </div>
            
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add job</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

// const DEFAULT_CARDS_ONE = [
//   { title: "Account Manager", id: "1", column: "wishlist" },
//   { title: "Accountant", id: "2", column: "wishlist" },
// ];

// const jobTitles = [
//   'Account Manager', 'Accountant',
// ]

const jobTitles = [
  'Account Manager', 'Accountant', 'Administrative Assistant',
  'Back end Developer', 'Business Analyst',
  'Business Development Manager', 'Business Intelligence Analyst',
  'CEO', 'Chief Data Officer', 'Chief Technology Officer',
  'Content Marketing Manager', 'Copywriter', 'Creative Director',
  'Customer Service Manager', 'Customer Service Rep',
  'Customer Service Representative', 'Customer Success Manager',
  'Customer Success Rep', 'Data Analyst', 'Data Entry Clerk',
  'Data Scientist', 'Delivery Driver', 'Digital Content Producer',
  'Digital Marketing Manager', 'Digital Marketing Specialist',
  'Director', 'Director of Business Development',
  'Director of Data Science', 'Director of Engineering',
  'Director of Finance', 'Director of HR',
  'Director of Human Capital', 'Director of Human Resources',
  'Director of Marketing', 'Director of Operations',
  'Director of Product Management', 'Director of Sales',
  'Director of Sales and Marketing', 'Event Coordinator',
  'Financial Advisor', 'Financial Analyst', 'Financial Manager',
  'Front End Developer', 'Front end Developer',
  'Full Stack Engineer', 'Graphic Designer', 'HR Generalist',
  'HR Manager', 'Help Desk Analyst', 'Human Resources Coordinator',
  'Human Resources Director', 'Human Resources Manager',
  'IT Manager', 'IT Support', 'IT Support Specialist',
  'Junior Account Manager', 'Junior Accountant',
  'Junior Advertising Coordinator', 'Junior Business Analyst',
  'Junior Business Development Associate',
  'Junior Business Operations Analyst', 'Junior Copywriter',
  'Junior Customer Support Specialist', 'Junior Data Analyst',
  'Junior Data Scientist', 'Junior Designer', 'Junior Developer',
  'Junior Financial Advisor', 'Junior Financial Analyst',
  'Junior HR Coordinator', 'Junior HR Generalist',
  'Junior Marketing Analyst', 'Junior Marketing Coordinator',
  'Junior Marketing Manager', 'Junior Marketing Specialist',
  'Junior Operations Analyst', 'Junior Operations Coordinator',
  'Junior Operations Manager', 'Junior Product Manager',
  'Junior Project Manager', 'Junior Recruiter',
  'Junior Research Scientist', 'Junior Sales Associate',
  'Junior Sales Representative', 'Junior Social Media Manager',
  'Junior Social Media Specialist', 'Junior Software Developer',
  'Junior Software Engineer', 'Junior UX Designer',
  'Junior Web Designer', 'Junior Web Developer',
  'Juniour HR Coordinator', 'Juniour HR Generalist',
  'Marketing Analyst', 'Marketing Coordinator', 'Marketing Director',
  'Marketing Manager', 'Marketing Specialist', 'Network Engineer',
  'Office Manager', 'Operations Analyst', 'Operations Director',
  'Operations Manager', 'Principal Engineer', 'Principal Scientist',
  'Product Designer', 'Product Manager', 'Product Marketing Manager',
  'Project Engineer', 'Project Manager', 'Public Relations Manager',
  'Receptionist', 'Recruiter', 'Research Director',
  'Research Scientist', 'Sales Associate', 'Sales Director',
  'Sales Executive', 'Sales Manager', 'Sales Operations Manager',
  'Sales Representative', 'Senior Account Executive',
  'Senior Account Manager', 'Senior Accountant',
  'Senior Business Analyst', 'Senior Business Development Manager',
  'Senior Consultant', 'Senior Data Analyst', 'Senior Data Engineer',
  'Senior Data Scientist', 'Senior Engineer',
  'Senior Financial Advisor', 'Senior Financial Analyst',
  'Senior Financial Manager', 'Senior Graphic Designer',
  'Senior HR Generalist', 'Senior HR Manager',
  'Senior HR Specialist', 'Senior Human Resources Coordinator',
  'Senior Human Resources Manager',
  'Senior Human Resources Specialist', 'Senior IT Consultant',
  'Senior IT Project Manager', 'Senior IT Support Specialist',
  'Senior Manager', 'Senior Marketing Analyst',
  'Senior Marketing Coordinator', 'Senior Marketing Director',
  'Senior Marketing Manager', 'Senior Marketing Specialist',
  'Senior Operations Analyst', 'Senior Operations Coordinator',
  'Senior Operations Manager', 'Senior Product Designer',
  'Senior Product Development Manager', 'Senior Product Manager',
  'Senior Product Marketing Manager', 'Senior Project Coordinator',
  'Senior Project Engineer', 'Senior Project Manager',
  'Senior Quality Assurance Analyst', 'Senior Research Scientist',
  'Senior Researcher', 'Senior Sales Manager',
  'Senior Sales Representative', 'Senior Scientist',
  'Senior Software Architect', 'Senior Software Developer',
  'Senior Software Engineer', 'Senior Training Specialist',
  'Senior UX Designer', 'Social Media Man', 'Social Media Manager',
  'Social Media Specialist', 'Software Developer',
  'Software Engineer', 'Software Engineer Manager',
  'Software Manager', 'Software Project Manager',
  'Strategy Consultant', 'Supply Chain Analyst',
  'Supply Chain Manager', 'Technical Recruiter',
  'Technical Support Specialist', 'Technical Writer',
  'Training Specialist', 'UX Designer', 'UX Researcher',
  'VP of Finance', 'VP of Operations', 'Web Developer'
]

const DEFAULT_CARDS = jobTitles.map((title, i) => ({
  title,
  id: String(i),
  column: "wishlist",
}));

// const DEFAULT_CARDS_JSON = JSON.stringify(DEFAULT_CARDS);
console.log(DEFAULT_CARDS);
// console.log(DEFAULT_CARDS_ONE);
// console.log(DEFAULT_CARDS_JSON);

