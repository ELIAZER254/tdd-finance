function TransferForm({
  fromAccount,
  setFromAccount,
  toAccount,
  setToAccount,
  transferAmount,
  setTransferAmount,
  transferFee,
  setTransferFee,
  addTransfer,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    >
      <h2>🔄 Transfer Money</h2>

      <select
        value={fromAccount}
        onChange={(e) =>
          setFromAccount(e.target.value)
        }
      >
        <option>M-Pesa</option>
        <option>Equity</option>
        <option>Cash</option>
      </select>

      <br />
      <br />

      <select
        value={toAccount}
        onChange={(e) =>
          setToAccount(e.target.value)
        }
      >
        <option>M-Pesa</option>
        <option>Equity</option>
        <option>Cash</option>
      </select>

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={transferAmount}
        onChange={(e) =>
          setTransferAmount(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Fee (optional)"
        value={transferFee}
        onChange={(e) =>
          setTransferFee(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={addTransfer}>
        Transfer
      </button>
    </div>
  );
}

export default TransferForm;