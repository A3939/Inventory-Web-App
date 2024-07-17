// src/components/EditProduct.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

const EditProduct = ({ products, setProducts }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products[productId];

  const initialValues = {
    qty: Array.isArray(product.qty) ? product.qty : [],
    currWeight: product.currWeight || 0,
    totalWeight: product.totalWeight || 0,
  };

  const validationSchema = Yup.object({
    qty: Yup.array().of(Yup.number().required('Required')).required('At least one quantity is required'),
    currWeight: Yup.number().required('Required'),
    totalWeight: Yup.number().required('Required'),
  });

  const handleSubmit = (values) => {
    const totalQty = values.qty.reduce((sum, q) => sum + q, 0);
    const TotalWeight = values.currWeight / values.totalWeight;
    const FinalQty = totalQty + TotalWeight;

    const updatedProduct = {
      ...product,
      qty: values.qty,
      currWeight: values.currWeight,
      totalWeight: values.totalWeight,
      TotalWeight,
      FinalQty,
    };

    const updatedProducts = {
      ...products,
      [productId]: updatedProduct,
    };

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    navigate('/products');
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <FieldArray name="qty">
              {({ push, remove }) => (
                <div>
                  <label>Quantities:</label>
                  {values.qty.map((quantity, index) => (
                    <div key={index}>
                      <Field name={`qty[${index}]`} type="number" />
                      <button type="button" onClick={() => remove(index)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push(0)}>Add Quantity</button>
                </div>
              )}
            </FieldArray>
            <div>
              <label>Current Weight: </label>
              <Field name="currWeight" type="number" />
            </div>
            <div>
              <label>Total Weight: </label>
              <Field name="totalWeight" type="number" />
            </div>
            <div>
              <p>Total Weight: {values.currWeight / values.totalWeight}</p>
              <p>Final Quantity: {values.qty.reduce((sum, q) => sum + q, 0) + (values.currWeight / values.totalWeight)}</p>
            </div>
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProduct;








// src/components/ProductList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const ProductList = ({ products }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 10; // Vertical position on the PDF

    Object.keys(products).forEach((key, index) => {
      const product = products[key];
      const qtyDisplay = Array.isArray(product.qty) ? product.qty.join(', ') : product.qty;

      doc.text(`Product ${index + 1}:`, 10, y);
      y += 10;
      doc.text(`Name: ${product.name}`, 10, y);
      y += 10;
      doc.text(`Quantities: ${qtyDisplay}`, 10, y);
      y += 10;
      doc.text(`Current Weight: ${product.currWeight}`, 10, y);
      y += 10;
      doc.text(`Total Weight: ${product.totalWeight}`, 10, y);
      y += 10;
      doc.text(`Total Weight Calculated: ${product.TotalWeight}`, 10, y);
      y += 10;
      doc.text(`Final Quantity: ${product.FinalQty}`, 10, y);
      y += 20; // Add extra space between products
    });

    doc.save('products.pdf');
  };

  return (
    <div>
      <h2>Product List</h2>
      <button onClick={exportToPDF}>Export to PDF</button>
      <ul>
        {Object.keys(products).map((key) => {
          const product = products[key];
          const qtyDisplay = Array.isArray(product.qty) ? product.qty.join(', ') : product.qty;

          return (
            <li key={key}>
              {product.name} - Qty: {qtyDisplay} - 
              Current Weight: {product.currWeight} - 
              Total Weight: {product.totalWeight} - 
              Total Weight Calculated: {product.TotalWeight} - 
              Final Quantity: {product.FinalQty}
              <Link to={`/edit/${key}`}> Edit</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// export default ProductList;
