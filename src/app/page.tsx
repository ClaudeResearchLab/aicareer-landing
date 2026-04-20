export default function Home() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "40ch", textAlign: "center" }}>
        <h1>AICareer v2 Landing — scaffold</h1>
        <p>
          Empty baseline. Run <code>/clone-website</code> in Claude Code to start
          the port of ellipsus.com.
        </p>
      </div>
    </main>
  );
}
