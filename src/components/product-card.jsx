import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaEye,
  FaFire,
  FaTag,
} from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

export default function ProductCard({ product, showQuickView = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showQuickViewModal, setShowQuickViewModal] = useState(false);

  // Calculate discount percentage
  const discountPercentage =
    product.labeledPrice && product.price < product.labeledPrice
      ? Math.round(
          ((product.labeledPrice - product.price) / product.labeledPrice) * 100
        )
      : 0;

  // Calculate average rating
  const averageRating = product.ratings?.length
    ? (
        product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length
      ).toFixed(1)
    : "0.0";

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <>
      <div
        className="relative group w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges Container */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
              <MdDiscount className="text-white" />
              <span>-{discountPercentage}%</span>
            </div>
          )}

          {/* Hot/New Badge */}
          {product.isNew && (
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
              <FaFire className="text-white" />
              <span>NEW</span>
            </div>
          )}

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
              <FaStar className="text-white" />
              <span>FEATURED</span>
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isLiked ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-600 dark:text-gray-300 text-xl hover:text-red-500" />
          )}
        </button>

        {/* Product Image Container */}
        <div className="relative h-64 overflow-hidden">
          <Link to={`/overview/${product.productId}`}>
            {/* Main Image */}
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Hover Image */}
            {product.images[1] && isHovered && (
              <img
                src={product.images[1]}
                alt={`${product.name} - alternate view`}
                className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-100"
              />
            )}

            {/* Quick View Overlay */}
            {isHovered && showQuickView && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickViewModal(true);
                  }}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  <FaEye />
                  Quick View
                </button>
              </div>
            )}

            {/* Stock Status */}
            <div className="absolute bottom-3 left-3">
              {product.stock > 0 ? (
                <span className="bg-emerald-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                  Out of Stock
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Category */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {product.category || "Category"}
          </p>

          {/* Product Name */}
          <Link to={`/overview/${product.productId}`}>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-sm ${
                    star <= Math.round(averageRating)
                      ? "text-amber-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({averageRating} • {product.reviewCount || 0} reviews)
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {/* Current Price */}
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatPrice(product.price)}
              </span>

              {/* Original Price */}
              {discountPercentage > 0 && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.labeledPrice)}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic here
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
              aria-label="Add to cart"
              disabled={product.stock === 0}
            >
              <FaShoppingCart />
            </button>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
            {product.brand && (
              <span className="font-medium">{product.brand}</span>
            )}
            {product.shipping && (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {product.shipping}
              </span>
            )}
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/30 rounded-2xl pointer-events-none transition-all duration-300"></div>
      </div>

      {/* Quick View Modal */}
      {showQuickViewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            {/* Modal content would go here */}
            <div className="p-6">
              <button
                onClick={() => setShowQuickViewModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                Close
              </button>
              <h3 className="text-xl font-bold mb-4">
                Quick View: {product.name}
              </h3>
              {/* Add quick view content */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
