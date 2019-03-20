import react from 'React';
import { defaultCipherList } from 'constants';

class Details extends React.Component {
  render() {
    return (
      <div>
        <section className="fdb-block">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col col-md-8 text-center">
                <p className="lead">
                  Far far away, behind the word mountains, far from the countries Vokalia and
                  Consonantia, there live the blind texts. Separated they live in{' '}
                  <a href="#">Bookmarksgrove</a> right at the coast of the
                  Semantics, a large language ocean.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Details;
