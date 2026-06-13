import { useState, useEffect } from "react";

import Dashboard from "./components/Dashboard";
import SetupWizard from "./components/SetupWizard";
import FavoriteForm from "./components/FavoriteForm";
import FavoriteCard from "./components/FavoriteCard";
import TransactionList from "./components/TransactionList";
import AddTransactionForm from "./components/AddTransactionForm";
import TransferForm from "./components/TransferForm";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [mpesaBalance, setMpesaBalance] = useState(() => {
    return Number(localStorage.getItem("mpesaBalance")) || 0;
  });

  const [equityBalance, setEquityBalance] = useState(() => {
    return Number(localStorage.getItem("equityBalance")) || 0;
  });

  const [cashBalance, setCashBalance] = useState(() => {
    return Number(localStorage.getItem("cashBalance")) || 0;
  });

  const [setupDone, setSetupDone] = useState(() => {
    return localStorage.getItem("setupDone") === "true";
  });

  const resetApp = () => {
  if (
    window.confirm(
      "This will delete ALL transactions, favorites, balances and settings. Continue?"
    )
  ) {
    localStorage.clear();
    window.location.reload();
  }
    };

  const [selectedFavorite, setSelectedFavorite] = useState(null);
  
  const [editingTransaction, setEditingTransaction] =
  useState(null);

  const [searchTerm, setSearchTerm] =
  useState("");

  const [filterType, setFilterType] =
  useState("All");

  const [sortBy, setSortBy] =
  useState("Newest");

  const [showForm, setShowForm] = useState(false);

  const [favoriteName, setFavoriteName] = useState("");
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("M-Pesa");
  const [service, setService] = useState("Send Money");
  const [variableAmount, setVariableAmount] = useState(false);

  const [transactionType, setTransactionType] =
    useState("Expense");

  const [transactionAmount, setTransactionAmount] =
    useState("");

  const [transactionCategory, setTransactionCategory] =
    useState("");

  const [transactionAccount, setTransactionAccount] =
    useState("M-Pesa");

  const [transactionService, setTransactionService] =
    useState("Send Money");

  const [transactionFee, setTransactionFee] =
    useState("");

  const [fromAccount, setFromAccount] =
  useState("M-Pesa");

  const [toAccount, setToAccount] =
    useState("Cash");

  const [transferAmount, setTransferAmount] =
    useState("");

  const [transferFee, setTransferFee] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(
      "mpesaBalance",
      mpesaBalance
    );

    localStorage.setItem(
      "equityBalance",
      equityBalance
    );

    localStorage.setItem(
      "cashBalance",
      cashBalance
    );
  }, [
    mpesaBalance,
    equityBalance,
    cashBalance,
  ]);

  const saveSetup = () => {
    localStorage.setItem(
      "setupDone",
      "true"
    );

    setSetupDone(true);
  };

  const addFavorite = () => {
    if (!favoriteName.trim()) {
      alert("Enter a favorite name");
      return;
    }

    const newFavorite = {
      id: Date.now(),
      favoriteName,
      type,
      amount,
      category,
      account,
      service,
      variableAmount,
    };

    setFavorites([
      ...favorites,
      newFavorite,
    ]);

    setFavoriteName("");
    setAmount("");
    setCategory("");
    setType("Expense");
    setAccount("M-Pesa");
    setService("Send Money");
    setVariableAmount(false);

    setShowForm(false);
  };

  const deleteFavorite = (id) => {
    if (
      window.confirm(
        "Delete this favorite?"
      )
    ) {
      setFavorites(
        favorites.filter(
          (fav) => fav.id !== id
        )
      );
    }
  };

  const useFavorite = (favorite) => {
    setSelectedFavorite(favorite);
  };

  const updateBalance = (
    type,
    account,
    amount
  ) => {
    if (type === "Income") {
      if (account === "M-Pesa")
        setMpesaBalance(
          (prev) => prev + amount
        );

      if (account === "Equity")
        setEquityBalance(
          (prev) => prev + amount
        );

      if (account === "Cash")
        setCashBalance(
          (prev) => prev + amount
        );
    }

    if (type === "Expense") {
      if (account === "M-Pesa")
        setMpesaBalance(
          (prev) => prev - amount
        );

      if (account === "Equity")
        setEquityBalance(
          (prev) => prev - amount
        );

      if (account === "Cash")
        setCashBalance(
          (prev) => prev - amount
        );
    }
  };

  const confirmTransaction = () => {
    const amountValue =
      Number(selectedFavorite.amount) || 0;

    const transaction = {
      id: Date.now(),
      name: selectedFavorite.favoriteName,
      type: selectedFavorite.type,
      category: selectedFavorite.category,
      amount: amountValue,
      account: selectedFavorite.account,
      service: selectedFavorite.service,
      date: new Date().toLocaleString(),
    };

    updateBalance(
      selectedFavorite.type,
      selectedFavorite.account,
      amountValue
    );

    setTransactions([
      transaction,
      ...transactions,
    ]);

    setSelectedFavorite(null);
  };

  const addTransaction = () => {
    const amountValue =
      Number(transactionAmount) || 0;
      const feeValue =
      Number(transactionFee) || 0;
      if (
      transactionType === "Expense"
    ) {
      let currentBalance = 0;

      if (transactionAccount === "M-Pesa")
        currentBalance = mpesaBalance;

      if (transactionAccount === "Equity")
        currentBalance = equityBalance;

      if (transactionAccount === "Cash")
        currentBalance = cashBalance;

      if (
        amountValue + feeValue >
        currentBalance
      ) {
        alert("Insufficient Balance");
        return;
      }
    }

    if (
      !transactionCategory ||
      amountValue <= 0
    ) {
      alert(
        "Enter a category and amount"
      );
      return;
    }

    const transaction = {
      id: Date.now(),
      name: transactionCategory,
      type: transactionType,
      category: transactionCategory,
      amount: amountValue,
      fee: feeValue,
      account: transactionAccount,
      service: transactionService,
      date: new Date().toLocaleString(),
      
    };

    updateBalance(
      transactionType,
      transactionAccount,
      amountValue + feeValue
    );

    setTransactions([
      transaction,
      ...transactions,
    ]);

    setTransactionAmount("");
    setTransactionFee("");
    setTransactionCategory("");
  };

  const deleteTransaction = (id) => {
  const transaction =
    transactions.find(
      (tx) => tx.id === id
    );

  if (!transaction) return;

  if (
    !window.confirm(
      "Delete this transaction?"
    )
  ) {
    return;
  }

  if (
  transaction.type === "Income"
) {
  updateBalance(
    "Expense",
    transaction.account,
    transaction.amount +
      (transaction.fee || 0)
  );
}

if (
  transaction.type === "Expense"
) {
  updateBalance(
    "Income",
    transaction.account,
    transaction.amount +
      (transaction.fee || 0)
  );
}
 if (transaction.type === "Transfer") {
  if (transaction.fromAccount === "M-Pesa") {
    setMpesaBalance(
      (prev) =>
        prev +
        transaction.amount +
        (transaction.fee || 0)
    );
  }

  if (transaction.fromAccount === "Equity") {
    setEquityBalance(
      (prev) =>
        prev +
        transaction.amount +
        (transaction.fee || 0)
    );
  }

  if (transaction.fromAccount === "Cash") {
    setCashBalance(
      (prev) =>
        prev +
        transaction.amount +
        (transaction.fee || 0)
    );
  }

  if (transaction.toAccount === "M-Pesa") {
    setMpesaBalance(
      (prev) =>
        prev - transaction.amount
    );
  }

  if (transaction.toAccount === "Equity") {
    setEquityBalance(
      (prev) =>
        prev - transaction.amount
    );
  }

  if (transaction.toAccount === "Cash") {
    setCashBalance(
      (prev) =>
        prev - transaction.amount
    );
  }
}

  setTransactions(
    transactions.filter(
      (tx) => tx.id !== id
    )
  );
};

  const startEditTransaction = (
    transaction
  ) => {
    setEditingTransaction({
      ...transaction,
    });
  };

  const saveEditedTransaction = () => {
    const oldTransaction =
      transactions.find(
        (tx) =>
          tx.id === editingTransaction.id
      );

    if (!oldTransaction) return;

    if (
        oldTransaction.type === "Income"
      ) {
        updateBalance(
          "Expense",
          oldTransaction.account,
          oldTransaction.amount +
            (oldTransaction.fee || 0)
        );
      }

      if (
        oldTransaction.type === "Expense"
      ) {
        updateBalance(
          "Income",
          oldTransaction.account,
          oldTransaction.amount +
            (oldTransaction.fee || 0)
        );
      }

      if (
        oldTransaction.type === "Transfer"
      ) {
        if (
          oldTransaction.fromAccount ===
          "M-Pesa"
        ) {
          setMpesaBalance(
            (prev) =>
              prev +
              oldTransaction.amount +
              (oldTransaction.fee || 0)
          );
        }

        if (
          oldTransaction.fromAccount ===
          "Equity"
        ) {
          setEquityBalance(
            (prev) =>
              prev +
              oldTransaction.amount +
              (oldTransaction.fee || 0)
          );
        }

        if (
          oldTransaction.fromAccount ===
          "Cash"
        ) {
          setCashBalance(
            (prev) =>
              prev +
              oldTransaction.amount +
              (oldTransaction.fee || 0)
          );
        }

        if (
          oldTransaction.toAccount ===
          "M-Pesa"
        ) {
          setMpesaBalance(
            (prev) =>
              prev - oldTransaction.amount
          );
        }

        if (
          oldTransaction.toAccount ===
          "Equity"
        ) {
          setEquityBalance(
            (prev) =>
              prev - oldTransaction.amount
          );
        }

        if (
          oldTransaction.toAccount ===
          "Cash"
        ) {
          setCashBalance(
            (prev) =>
              prev - oldTransaction.amount
          );
        }
      }

    const updatedTransaction = {
      ...editingTransaction,
    };

    setTransactions((prev) => [
      updatedTransaction,
      ...prev.filter(
        (tx) =>
          tx.id !== updatedTransaction.id
      ),
    ]);

    if (
      updatedTransaction.type ===
      "Income"
    ) {
      updateBalance(
        "Income",
        updatedTransaction.account,
        updatedTransaction.amount +
          (updatedTransaction.fee || 0)
      );
    }

    if (
      updatedTransaction.type ===
      "Expense"
    ) {
      updateBalance(
        "Expense",
        updatedTransaction.account,
        updatedTransaction.amount +
          (updatedTransaction.fee || 0)
      );
    }

    if (
  updatedTransaction.type ===
  "Transfer"
) {
  if (
    updatedTransaction.fromAccount ===
    "M-Pesa"
  ) {
    setMpesaBalance(
      (prev) =>
        prev -
        updatedTransaction.amount -
        (updatedTransaction.fee || 0)
    );
  }

  if (
    updatedTransaction.fromAccount ===
    "Equity"
  ) {
    setEquityBalance(
      (prev) =>
        prev -
        updatedTransaction.amount -
        (updatedTransaction.fee || 0)
    );
  }

  if (
    updatedTransaction.fromAccount ===
    "Cash"
  ) {
    setCashBalance(
      (prev) =>
        prev -
        updatedTransaction.amount -
        (updatedTransaction.fee || 0)
    );
  }

  if (
        updatedTransaction.toAccount ===
        "M-Pesa"
      ) {
        setMpesaBalance(
          (prev) =>
            prev +
            updatedTransaction.amount
        );
      }

      if (
        updatedTransaction.toAccount ===
        "Equity"
      ) {
        setEquityBalance(
          (prev) =>
            prev +
            updatedTransaction.amount
        );
      }

      if (
        updatedTransaction.toAccount ===
        "Cash"
      ) {
        setCashBalance(
          (prev) =>
            prev +
            updatedTransaction.amount
        );
      }
    }

    setEditingTransaction(null);
  };

 const addTransfer = () => {
  const amount =
    Number(transferAmount) || 0;

  const fee =
    Number(transferFee) || 0;

    let sourceBalance = 0;

      if (fromAccount === "M-Pesa")
        sourceBalance = mpesaBalance;

      if (fromAccount === "Equity")
        sourceBalance = equityBalance;

      if (fromAccount === "Cash")
        sourceBalance = cashBalance;

      if (
        amount + fee >
        sourceBalance
      ) {
        alert("Insufficient Balance");
        return;
      }

  if (
    amount <= 0 ||
    fromAccount === toAccount
  ) {
    alert("Invalid transfer");
    return;
  }

  if (fromAccount === "M-Pesa") {
    setMpesaBalance(
      (prev) => prev - amount - fee
    );
  }

  if (fromAccount === "Equity") {
    setEquityBalance(
      (prev) => prev - amount - fee
    );
  }

  if (fromAccount === "Cash") {
    setCashBalance(
      (prev) => prev - amount - fee
    );
  }

  if (toAccount === "M-Pesa") {
    setMpesaBalance(
      (prev) => prev + amount
    );
  }

  if (toAccount === "Equity") {
    setEquityBalance(
      (prev) => prev + amount
    );
  }

  if (toAccount === "Cash") {
    setCashBalance(
      (prev) => prev + amount
    );
  }

  const transferTransaction = {
    id: Date.now(),
    name: `Transfer: ${fromAccount} → ${toAccount}`,
    type: "Transfer",
    category: "Transfer",
    amount,
    fee,
    fromAccount,
    toAccount,
    account: fromAccount,
    date: new Date().toLocaleString(),
  };

  const newTransactions = [
    transferTransaction,
    ...transactions,
  ];

  setTransactions(newTransactions);

  setTransferAmount("");
  setTransferFee("");
};

const filteredTransactions =
  transactions
    .filter((tx) => {
      const matchesSearch =
        (
          tx.name +
          " " +
          tx.category +
          " " +
          tx.type +
          " " +
          (tx.account || "") +
          " " +
          (tx.service || "") +
          " " +
          (tx.fromAccount || "") +
          " " +
          (tx.toAccount || "")
        )
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesFilter =
        filterType === "All" ||
        tx.type === filterType ||
        tx.account === filterType ||
        tx.fromAccount ===
          filterType ||
        tx.toAccount ===
          filterType;

      return (
        matchesSearch &&
        matchesFilter
      );
    })
    .sort((a, b) => {
      if (sortBy === "Newest") {
        return b.id - a.id;
      }

      if (sortBy === "Oldest") {
        return a.id - b.id;
      }

      if (sortBy === "Highest") {
        return b.amount - a.amount;
      }

      if (sortBy === "Lowest") {
        return a.amount - b.amount;
      }

      return 0;
    });

    const totalIncome =
  transactions
    .filter(
      (tx) => tx.type === "Income"
    )
    .reduce(
      (sum, tx) =>
        sum + tx.amount,
      0
    );

const totalExpenses =
  transactions
    .filter(
      (tx) => tx.type === "Expense"
    )
    .reduce(
      (sum, tx) =>
        sum +
        tx.amount +
        (tx.fee || 0),
      0
    );

const totalTransferFees =
  transactions
    .filter(
      (tx) =>
        tx.type === "Transfer"
    )
    .reduce(
      (sum, tx) =>
        sum + (tx.fee || 0),
      0
    );

    const incomeCount =
  transactions.filter(
    (tx) => tx.type === "Income"
  ).length;

const expenseCount =
  transactions.filter(
    (tx) => tx.type === "Expense"
  ).length;

const transferCount =
  transactions.filter(
    (tx) => tx.type === "Transfer"
  ).length;

  if (!setupDone) {
    return (
      <SetupWizard
        mpesaBalance={mpesaBalance}
        setMpesaBalance={setMpesaBalance}
        equityBalance={equityBalance}
        setEquityBalance={setEquityBalance}
        cashBalance={cashBalance}
        setCashBalance={setCashBalance}
        saveSetup={saveSetup}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
            display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "50px",
        }}
      >
          <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            lineHeight: "1.1",
          }}
        >
          PERSONAL FINANCE MANAGER
        </h1>

        <button
          onClick={resetApp}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ⚠️ Reset App
        </button>
      </div>


        <Dashboard
          mpesaBalance={mpesaBalance}
          equityBalance={equityBalance}
          cashBalance={cashBalance}
        />

        

        <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
            minWidth: "300px",
          }}
        >
          <h2>💰 Total Worth</h2>

          <p>
            M-Pesa: KES{" "}
            {mpesaBalance.toLocaleString()}
          </p>

          <p>
            Equity: KES{" "}
            {equityBalance.toLocaleString()}
          </p>

          <p>
            Cash: KES{" "}
            {cashBalance.toLocaleString()}
          </p>

          <hr />

          <h2>
            TOTAL: KES{" "}
            {(
              mpesaBalance +
              equityBalance +
              cashBalance
            ).toLocaleString()}
          </h2>
        </div>

        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
            minWidth: "300px",
          }}
        >
          <h2>📊 Statistics</h2>

          <p>
            Transactions:{" "}
            {transactions.length}
          </p>

          <p>
              Income Transactions: {incomeCount}
            </p>

            <p>
              Expense Transactions: {expenseCount}
            </p>

            <p>
              Transfer Transactions: {transferCount}
            </p>

          <p>
            Income: KES{" "}
            {totalIncome.toLocaleString()}
          </p>

          <p>
            Expenses: KES{" "}
            {totalExpenses.toLocaleString()}
          </p>

          <p>
            Transfer Fees: KES{" "}
            {totalTransferFees.toLocaleString()}
          </p>

          <hr />

          <h3>
            Net Change: KES{" "}
            {(
              totalIncome -
              totalExpenses -
              totalTransferFees
            ).toLocaleString()}
          </h3>
        </div>
      </div>
      <AddTransactionForm
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        transactionAmount={transactionAmount}
        setTransactionAmount={
          setTransactionAmount
        }
        transactionCategory={
          transactionCategory
        }
        setTransactionCategory={
          setTransactionCategory
        }
        transactionAccount={
          transactionAccount
        }
        setTransactionAccount={
          setTransactionAccount
        }
        transactionService={
          transactionService
        }
        setTransactionService={
          setTransactionService
        }
        transactionFee={transactionFee}
        setTransactionFee={
          setTransactionFee
        }
        addTransaction={addTransaction}
              />
      <TransferForm
        fromAccount={fromAccount}
        setFromAccount={setFromAccount}
        toAccount={toAccount}
        setToAccount={setToAccount}
        transferAmount={transferAmount}
        setTransferAmount={setTransferAmount}
        transferFee={transferFee}
        setTransferFee={setTransferFee}
        addTransfer={addTransfer}
      />

      

<div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
    marginTop: "10px",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search transactions..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    style={{
      flex: 1,
      minWidth: "250px",
      padding: "10px",
      borderRadius: "10px",
      border: "none",
    }}
  />

  <select
    value={filterType}
    onChange={(e) =>
      setFilterType(e.target.value)
    }
    style={{
      padding: "10px",
      borderRadius: "10px",
    }}
  >
    <option value="All">
      All Transactions
    </option>

    <option value="Income">
      Income
    </option>

    <option value="Expense">
      Expense
    </option>

    <option value="Transfer">
      Transfer
    </option>

    <option value="M-Pesa">
      M-Pesa
    </option>

    <option value="Equity">
      Equity
    </option>

    <option value="Cash">
      Cash
    </option>
  </select>

  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
    style={{
      padding: "10px",
      borderRadius: "10px",
    }}
  >
    <option value="Newest">
      Newest First
    </option>

    <option value="Oldest">
      Oldest First
    </option>

    <option value="Highest">
      Highest Amount
    </option>

    <option value="Lowest">
      Lowest Amount
    </option>
  </select>
</div> 

<h2>⭐ Favorites</h2>

<button
  onClick={() =>
    setShowForm(!showForm)
  }
>
  + Add Favorite
</button>

      <br />
      <br />

      {showForm && (
        <FavoriteForm
          favoriteName={favoriteName}
          setFavoriteName={setFavoriteName}
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          amount={amount}
          setAmount={setAmount}
          variableAmount={variableAmount}
          setVariableAmount={
            setVariableAmount
          }
          account={account}
          setAccount={setAccount}
          service={service}
          setService={setService}
          addFavorite={addFavorite}
        />
      )}

      {editingTransaction && (
        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "20px",
          }}
        >
          <h2>✏️ Edit Transaction</h2>

          <input
            type="text"
            value={editingTransaction.category}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                category: e.target.value,
                name: e.target.value,
              })
            }
            placeholder="Category"
          />

          <br />
          <br />

          <input
            type="number"
            value={editingTransaction.amount}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                amount: Number(e.target.value),
              })
            }
            placeholder="Amount"
          />

          <br />
          <br />

          <input
            type="number"
            value={editingTransaction.fee || 0}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                fee: Number(e.target.value),
              })
            }
            placeholder="Fee"
          />

          <br />
          <br />

          {editingTransaction.type ===
            "Transfer" && (
            <>
              <select
                value={
                  editingTransaction.fromAccount
                }
                onChange={(e) =>
                  setEditingTransaction({
                    ...editingTransaction,
                    fromAccount:
                      e.target.value,
                  })
                }
              >
                <option>M-Pesa</option>
                <option>Equity</option>
                <option>Cash</option>
              </select>

              <br />
              <br />

              <select
                value={
                  editingTransaction.toAccount
                }
                onChange={(e) =>
                  setEditingTransaction({
                    ...editingTransaction,
                    toAccount:
                      e.target.value,
                  })
                }
              >
                <option>M-Pesa</option>
                <option>Equity</option>
                <option>Cash</option>
              </select>

              <br />
              <br />
            </>
          )}
          

          <button
            onClick={saveEditedTransaction}
          >
            💾 Save Changes
          </button>

          <button
            onClick={() =>
              setEditingTransaction(null)
            }
            style={{
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {selectedFavorite && (
        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "20px",
          }}
        >
          <h2>Confirm Transaction</h2>

          <p>
            {selectedFavorite.favoriteName}
          </p>

          <p>
            KES {selectedFavorite.amount}
          </p>

          <button
            onClick={confirmTransaction}
          >
            Confirm
          </button>

          <button
            onClick={() =>
              setSelectedFavorite(null)
            }
          >
            Cancel
          </button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {favorites.length === 0 ? (
  <p>No favorites yet.</p>
) : (
  favorites.map((fav) => (
    <FavoriteCard
      key={fav.id}
      fav={fav}
      useFavorite={useFavorite}
      deleteFavorite={deleteFavorite}
    />
  ))
)}
      </div>

      <div
        style={{
          marginTop: "40px",
        }}
      >
      <TransactionList
        transactions={
          filteredTransactions
        }
        deleteTransaction={
          deleteTransaction
        }
        startEditTransaction={
          startEditTransaction
        }
      />
      </div>
    </div>
  );
}

export default App;