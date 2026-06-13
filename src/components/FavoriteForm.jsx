function FavoriteForm({
  favoriteName,
  setFavoriteName,
  type,
  setType,
  category,
  setCategory,
  amount,
  setAmount,
  variableAmount,
  setVariableAmount,
  account,
  setAccount,
  service,
  setService,
  addFavorite,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3>Create Favorite</h3>

      <input
        placeholder="Favorite Name"
        value={favoriteName}
        onChange={(e) =>
          setFavoriteName(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value)
        }
      >
        <option>Income</option>
        <option>Expense</option>
        <option>Transfer</option>
      </select>

      <br />
      <br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      />

      <br />
      <br />

      {!variableAmount && (
        <>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <br />
          <br />
        </>
      )}

      <label>
        <input
          type="checkbox"
          checked={variableAmount}
          onChange={() =>
            setVariableAmount(
              !variableAmount
            )
          }
        />
        Variable Amount
      </label>

      <br />
      <br />

      <select
        value={account}
        onChange={(e) =>
          setAccount(e.target.value)
        }
      >
        <option>M-Pesa</option>
        <option>Equity</option>
        <option>Cash</option>
      </select>

      <br />
      <br />

      {account === "M-Pesa" && (
        <select
          value={service}
          onChange={(e) =>
            setService(e.target.value)
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
      )}

      <br />
      <br />

      <button onClick={addFavorite}>
        Save Favorite
      </button>
    </div>
  );
}

export default FavoriteForm;