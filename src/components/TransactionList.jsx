function TransactionList({
  transactions,
  deleteTransaction,
  startEditTransaction,
}) {
  return (
    <>
      <h2>Transactions</h2>

      <div
        style={{
          display: "grid",
          gap: "15px",
        }}
      >
        {transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            transactions.map((tx) => (
          <div
            key={tx.id}
            style={{
              background: "#1f2937",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3>{tx.name}</h3>

            <p>{tx.date}</p>

            <p>
              Amount: KES {tx.amount}
            </p>

            {tx.fee > 0 && (
              <p>
                Fee: KES {tx.fee}
              </p>
            )}

            {tx.fee > 0 && (
              <p>
                Total: KES {tx.amount + tx.fee}
              </p>
            )}

            {tx.type === "Transfer" && (
              <>
                <p>
                  From: {tx.fromAccount}
                </p>

                <p>
                  To: {tx.toAccount}
                </p>
              </>
            )}

            <p>
              Account: {tx.account}
            </p>
                {tx.service && (
                <p>
                 Payment Method: {tx.service}
                </p>
              )}

            <p>
              Type: {tx.type}
            </p>

            <button
                onClick={() =>
                  startEditTransaction(tx)
                }
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                ✏️ Edit
              </button>

            <button
              onClick={() =>
                deleteTransaction(tx.id)
              }
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              🗑 Delete
            </button>
                    </div>
        ))
      )}
      </div>
    </>
  );
}

export default TransactionList;