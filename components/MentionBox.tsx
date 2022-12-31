type Props = {
  coord: {
    top: number;
    left: number;
  };
  people: string[];
};

export default function MentionBox({ coord, people }: Props) {
  return (
    <div
      className="max-w-[200px] max-h-[400px] overflow-auto bg-white absolute"
      style={{
        top: coord.top,
        left: coord.left,
      }}
    >
      {people.map((person) => (
        <div className="p-1 hover:bg-emerald-50 border-2 border-slate-200 cursor-pointer text-left">
          <p
            className="overflow-ellipsis"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {person}
          </p>
        </div>
      ))}
    </div>
  );
}
