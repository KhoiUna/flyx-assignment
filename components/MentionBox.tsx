type Props = {
  coord: {
    top: number;
    left: number;
  };
  people: string[];
  opened: boolean;
  toggle: () => void;
};

export default function MentionBox({ coord, people, opened, toggle }: Props) {
  if (!opened) return <></>;

  return (
    <div
      className="max-w-[200px] max-h-[400px] overflow-auto bg-white absolute"
      style={{
        top: coord.top,
        left: coord.left,
      }}
    >
      {people.map((person) => (
        <div
          className="p-1 hover:bg-orange-50 border-2 border-slate-200 cursor-pointer text-left"
          onClick={toggle}
        >
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
