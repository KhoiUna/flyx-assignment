type Props = {
  coord: {
    top: number;
    left: number;
  };
  people: {
    [key: string]: string[];
  };
  opened: boolean;
  handleClick: (type: string, nameEmail: string) => void;
};

export default function MentionBox({
  coord,
  people,
  opened,
  handleClick,
}: Props) {
  if (!opened) return <></>;

  return (
    <div
      className="max-w-[200px] max-h-[400px] overflow-auto bg-white absolute"
      style={{
        top: coord.top,
        left: coord.left,
      }}
    >
      {Object.keys(people).map((key, index) =>
        people[key].map((person: string, index: number) => (
          <div
            key={index}
            className="p-1 hover:bg-orange-50 border-2 border-slate-200 cursor-pointer text-left"
            onClick={() => handleClick(key, person)}
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
        ))
      )}
    </div>
  );
}
