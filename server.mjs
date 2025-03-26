import express from 'express';

const products = [
  {
    id: '731085fc268c4a94966bcd1bc7c0e993',
    name: 'Råglimpa',
    price: 29.95,
    weight: '200g',
  },
  {
    id: '12c6a09826b840d6934f387d0091a9d7',
    name: 'Frökubb',
    price: 34.9,
    weight: '250g',
  },
  {
    id: '8f046897631e4bc9beff6f29e7d869fe',
    name: 'Kanel bulle',
    price: 29.9,
    weight: '400g',
  },
  {
    id: '8f046897631e4bc9beff6f29e7d869fc',
    name: 'Vanilj bulle',
    price: 26.9,
    weight: '350g',
  },
];

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.get('/api/products', (req, res) => {
  res.status(200).json({ success: true, data: products });
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id === id);
  if (product) {
    res.status(200).json({ success: true, data: product });
    return;
  }

  res
    .status(404)
    .json({ success: false, message: 'Hittar ingen produkt med angivet id' });
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const product = products.find((p) => p.id === req.params.id);
    products.splice(products.indexOf(product), 1);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

app.put('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.weight = req.body.weight;
    res.status(204).end();
    return;
  }

  res
    .status(404)
    .json({ success: false, message: 'Hittar ingen produkt med angivet id' });
});

app.listen(port, () =>
  console.log(`Servern är uppe och lyssnar på port nummer: ${port}`)
);
