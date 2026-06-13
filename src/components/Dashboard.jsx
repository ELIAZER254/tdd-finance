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
          "repeat(auto-fit,minmax(220px,1fr))",
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
        <h3>Total Balance</h3>
        <h2>KES {totalBalance}</h2>
      </div>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>M-Pesa</h3>
        <h2>KES {mpesaBalance}</h2>
      </div>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>Equity</h3>
        <h2>KES {equityBalance}</h2>
      </div>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>Cash</h3>
        <h2>KES {cashBalance}</h2>
      </div>
    </div>
  );
}

export default Dashboard;