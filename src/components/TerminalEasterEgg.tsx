import { useState, useRef, useEffect } from "react";

const TerminalEasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ type: "cmd" | "out", text: string }[]>([
    { type: "out", text: "Welcome to Abhijeet's Shell v1.0.0" },
    { type: "out", text: "Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      setInput("");
      const newHistory = [...history, { type: "cmd", text: "> " + input }];
      
      switch(cmd) {
        case "help":
          newHistory.push({ type: "out", text: "Available commands: help, skills, contact, clear, sudo" });
          break;
        case "skills":
          newHistory.push({ type: "out", text: "[Machine Learning, Python, C++, Embedded C, FastAPI, OpenCV, RTOS]" });
          break;
        case "contact":
          newHistory.push({ type: "out", text: "Email: abhijeet123987@gmail.com | Phone: +91 7338473004" });
          break;
        case "clear":
          setHistory([]);
          return;
        case "sudo":
          newHistory.push({ type: "out", text: "bash: sudo: permission denied. Nice try! ;)" });
          break;
        case "":
          break;
        default:
          newHistory.push({ type: "out", text: `Command not found: ${cmd}` });
      }
      setHistory(newHistory as any);
    }
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed", bottom: "25px", right: "25px", zIndex: 9999,
            background: "rgba(0,0,0,0.8)", color: "#0f0", border: "1px solid rgba(0,255,0,0.3)",
            padding: "10px 18px", fontFamily: '"Fira Code", monospace', borderRadius: "50px", cursor: "pointer",
            boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
            backdropFilter: "blur(5px)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,255,0,0.4)";
            e.currentTarget.style.borderColor = "#0f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.5)";
            e.currentTarget.style.borderColor = "rgba(0,255,0,0.3)";
          }}
        >
          {">_ open root"}
        </button>
      )}
      
      {isOpen && (
        <div style={{
          position: "fixed", bottom: "25px", right: "25px", zIndex: 9999,
          width: "350px", height: "400px", background: "rgba(10,10,10,0.95)", border: "1px solid #333",
          borderRadius: "8px", display: "flex", flexDirection: "column",
          boxShadow: "0 10px 40px rgba(0,0,0,0.7)", overflow: "hidden", fontFamily: '"Fira Code", monospace', color: "#0f0",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{ background: "#222", padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#ccc" }}>abhijeet@server:~</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "transparent", border: "none", color: "#ff5f56", cursor: "pointer", fontWeight: "bold", fontSize: "1.1rem" }}>×</button>
          </div>
          <div style={{ padding: "12px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
            {history.map((line, i) => (
              <div key={i} style={{ color: line.type === "cmd" ? "#fff" : "#0f0", wordWrap: "break-word" }}>{line.text}</div>
            ))}
            <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
              <span style={{ color: "#fff", marginRight: "8px" }}>{"> "}</span>
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                style={{ background: "transparent", border: "none", color: "#0f0", outline: "none", width: "100%", fontFamily: '"Fira Code", monospace', fontSize: "0.9rem" }}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalEasterEgg;
