import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedFruitsList } from '../lib/fruit_data';
import { getSortedVeggieList } from '../lib/veggie_data';

// define a getStaticProps() function -this name is defined by next.js
export async function getStaticProps() {
  const fruitDataList = await getSortedFruitsList();
  const veggieDataList = getSortedVeggieList();
  return {
    props: { fruitDataList, veggieDataList },
  };
}

// Building root page and exporting
export default function Home({ fruitDataList, veggieDataList }) {
  return (
    <Layout home>
      <h1>Food Repo</h1>
      <h2 className="m-3">Fruits</h2>
      <div className="list-group">
        {fruitDataList.map(({ id, name }) => (
          <Link
            key={id}
            href={`/${id}`}
            className="list-group-item list-group-item-action"
          >
            {name}
          </Link>
        ))}
      </div>
      <h2 className="m-3">Veggies</h2>
      <div className="list-group">
        {veggieDataList.map(({ id, name }) => (
          <Link
            key={id}
            href={`/${id}`}
            className="list-group-item list-group-item-action"
          >
            {name}
          </Link>
        ))}
      </div>
    </Layout>
  );
}
