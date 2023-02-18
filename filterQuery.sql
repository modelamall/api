SELECT
    Products.title,
    Products.description,
    Products.categoryId,
    Products.id AS ID,
    ProductVariations.price,
    ProductVariations.count,
    ProductVariations.productId,
    ProductVariations.id AS VariationId,
    Pictures.url
FROM
    Products
    JOIN ProductVariations ON Products.id = ProductVariations.productId
    JOIN ProductProperties ON ProductVariations.id = ProductProperties.productVariationId
    JOIN Pictures ON Products.id = Pictures.pictureableId
    AND Pictures.pictureableType = 'Product'
WHERE
    (
        ProductVariations.price > 43086
        AND(
            EXISTS(
                SELECT
                    *
                FROM
                    ProductProperties
                WHERE
                    ProductProperties.propertyId = 1
                    AND ProductProperties.propertyValueId IN(18, 19)
            )
            AND(
                EXISTS(
                    SELECT
                        *
                    FROM
                        ProductProperties
                    WHERE
                        ProductProperties.propertyId = 8
                        AND ProductProperties.propertyValueId IN(21, 22)
                )
            )
        )
    )
GROUP BY
    url,
    ID
ORDER BY
    ProductVariations.price ASC;