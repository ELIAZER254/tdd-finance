function AddTransactionForm({
  transactionType,
  setTransactionType,
  transactionAmount,
  setTransactionAmount,
  transactionFee,
  setTransactionFee,
  transactionCategory,
  setTransactionCategory,
  transactionAccount,
  setTransactionAccount,
  transactionService,
  setTransactionService,
  addTransaction,
}){
  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    >
      <h2>➕ Add Transaction</h2>

      <select
        value={transactionType}
        onChange={(e) =>
          setTransactionType(e.target.value)
        }
      >
        <option>Expense</option>
        <option>Income</option>
      </select>

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={transactionAmount}
        onChange={(e) =>
          setTransactionAmount(e.target.value)
        }
      />

      <br />
    <br />

      <input
        type="number"
        placeholder="Transaction Fee"
        value={transactionFee}
        onChange={(e) =>
          setTransactionFee(e.target.value)
        }
      />

      <br />
      <br />

      <input
        placeholder="Category"
        value={transactionCategory}
        onChange={(e) =>
          setTransactionCategory(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={transactionAccount}
        onChange={(e) =>
          setTransactionAccount(e.target.value)
        }
      >
        <option>M-Pesa</option>
        <option>Equity</option>
        <option>Cash</option>
      </select>

      <br />
      <br />

      {transactionAccount ===
        "M-Pesa" && (
        <>
          <select
            value={transactionService}
            onChange={(e) =>
              setTransactionService(
                e.target.value
              )
            }
          >
            <option>Send Money</option>
            <option>Withdraw</option>
            <option>Buy Goods</option>
            <option>Paybill</option>
            <option>Pochi La Biashara</option>
            <option>Airtime</option>
            <option>Bundles</option>
          </select>

          <br />
          <br />
        </>
      )}

      <button onClick={addTransaction}>
        Save Transaction
      </button>
    </div>
  );
}

export default AddTransactionForm;