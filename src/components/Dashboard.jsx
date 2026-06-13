function Dashboard({
  mpesaBalance,
  equityBalance,
  cashBalance,
}) {
  const totalBalance =
    mpesaBalance +
    equityBalance +
    cashBalance;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(150px,1fr))",
        gap: "15px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>💰 Total Balance</h3>
        <h2
            style={{
              fontSize: "1.5rem",
              margin: "10px 0 0 0",
            }}
          >
            KES {totalBalance.toLocaleString()}
          </h2>
      </div>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>📱 M-Pesa</h3>
            <h2
            style={{
              fontSize: "1.5rem",
              margin: "10px 0 0 0",
            }}
          >
            KES {mpesaBalance.toLocaleString()}
          </h2>
      </div>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>🏦 Equity</h3>
        <h2
          style={{
            fontSize: "1.5rem",
            margin: "10px 0 0 0",
          }}
        >
          KES {equityBalance.toLocaleString()}
        </h2>
              </div>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>💵 Cash</h3>
          <h2
            style={{
              fontSize: "1.5rem",
              margin: "10px 0 0 0",
            }}
          >
            KES {cashBalance.toLocaleString()}
          </h2>
      </div>
    </div>
  );
}

export default Dashboard;