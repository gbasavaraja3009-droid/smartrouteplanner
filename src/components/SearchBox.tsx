type SearchBoxProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBox({
  placeholder,
  value,
  onChange,
}: SearchBoxProps) {
  return (
   <input
  type="text"
  placeholder={placeholder}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  style={{
  width: "100%",
  height: "56px",
  background: "#1E293B",
  color: "white",
  border: "1px solid #475569",
  borderRadius: "16px",
  padding: "0 18px",
  fontSize: "17px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  transition: "all 0.3s ease",
  outline: "none",
}}
/>
  );
}