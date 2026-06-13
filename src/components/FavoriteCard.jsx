function FavoriteCard({
  fav,
  useFavorite,
  deleteFavorite,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2>
        ⭐ {fav.favoriteName}
      </h2>

      <p>Type: {fav.type}</p>

      <p>
        Category: {fav.category}
      </p>

      <p>
        Amount:{" "}
        {fav.variableAmount
          ? "Variable"
          : `KES ${fav.amount}`}
      </p>

      <p>
        Account: {fav.account}
      </p>

      {fav.account ===
        "M-Pesa" && (
        <p>
          Service: {fav.service}
        </p>
      )}

      <button
        onClick={() =>
          useFavorite(fav)
        }
      >
        Use
      </button>

      <button
        onClick={() =>
          deleteFavorite(fav.id)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default FavoriteCard;