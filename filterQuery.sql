SELECT
    *
FROM
    products
-- JOIN
WHERE
    categoryId IN (
        SELECT
            id
        FROM
            Categories
        WHERE
            ID IN(12)
    )
    AND EXISTS(
        SELECT
            *
        FROM
            productVariations
        WHERE
            products.id = productVariations.productId
            AND(
                price > 4000
                AND EXISTS(
                    SELECT
                        *
                    FROM
                        productProperties
                    WHERE
                        productVariations.id = productProperties.productVariationId
                        AND propertyId = 1
                        AND propertyValueId IN(18)
                )
                OR EXISTS(
                    SELECT
                        *
                    FROM
                        productProperties
                    WHERE
                        productVariations.id = productProperties.productVariationId
                        AND propertyId = 8
                        AND propertyValueId IN(22)
                )
            )
    );
