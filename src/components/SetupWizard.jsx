function SetupWizard({
  mpesaBalance,
  setMpesaBalance,
  equityBalance,
  setEquityBalance,
  cashBalance,
  setCashBalance,
  saveSetup,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>TDD Finance Setup</h1>

      <p>M-Pesa Balance</p>

      <input
        type="number"
        value={mpesaBalance}
        onChange={(e) =>
          setMpesaBalance(Number(e.target.value))
        }
      />

      <p>Equity Balance</p>

      <input
        type="number"
        value={equityBalance}
        onChange={(e) =>
          setEquityBalance(Number(e.target.value))
        }
      />

      <p>Cash Balance</p>

      <input
        type="number"
        value={cashBalance}
        onChange={(e) =>
          setCashBalance(Number(e.target.value))
        }
      />

      <br />
      <br />

      <button onClick={saveSetup}>
        Save Setup
      </button>
    </div>
  );
}

export default SetupWizard;