import React from "react";

export const CommonCards = ({ cards = [] }) => {
  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          return (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#E5E7EB] p-4 flex items-center rounded-xl shadow-md"
            >
              <div className="text-[#2B2B2B] flex flex-col gap-2">
                <h2 className="text-gray-600 text-sm font-normal">
                  {card.title}
                </h2>
                <p
                  className="text-2xl font-normal"
                  style={{ color: card.numberColor }}
                >
                  {card.number}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
