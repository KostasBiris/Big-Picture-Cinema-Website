import { PropTypes as T } from 'prop-types';

export default T.shape({
    number: T.oneOfType([
        T.string,
        T.number
    ]).isRequired,
    isReserved: T.bool,
    isVip: T.bool
});
