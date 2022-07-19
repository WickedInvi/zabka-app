import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT, GET_ALL_PRODUCTS } from '../graphql/Queries';

export default function InputForm() {
  let barcode, name;
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  const submitHandler = (e) => {
    e.preventDefault();
    const barcode = e.target.barcode.value;
    const name = e.target.name.value;
    const date = e.target.date.value;
    const dateStamp = new Date(date).getTime();
    const status = 'AVAILABLE';
    const product = { barcode, name, date, dateStamp, status };
    barcode = barcode.value;
    name = name.value;
    // const product = { barcode, name };
    console.log('Handler called');
    // console.log(product);
    createProduct({
      variables: {
        product: {
          barcode: barcode,
          name: name,
        },
      },
    });
    // console.log(product);
    // e.target.reset();
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className='flex justify-center flex-col'>
      <form
        action='submit'
        onSubmit={submitHandler}
        className='flex flex-col'
      >
        <input
          ref={(value) => (barcode = value)}
          type='text'
          placeholder='Barcode'
          id='barcode'
        />
        <input
          ref={(value) => (name = value)}
          type='text'
          placeholder='Name'
          id='name'
        />
        {/* <input type='text' placeholder='Date' id='date' /> */}
        <button>Submit</button>
      </form>
      <br />
    </div>
  );
}
