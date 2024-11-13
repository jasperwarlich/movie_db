import { View, Image, Text, StyleSheet } from "react-native";

interface MovieListCardProps {
    movie: any;
}

const MovieListCard: React.FC<MovieListCardProps> = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.poster} resizeMode="contain" />
            <View style={styles.movie_info}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.releasedate}>Release: 2024-10-22</Text>
                <Text style={styles.overview} numberOfLines={8}>{movie.overview}</Text>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#333',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        width: '100%',
    },
    poster: {
        width: '43%',
        height: 220,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        flexWrap: 'wrap',
    },
    movie_info: {
        flex: 1,
        padding: 10,
    },
    overview: {
        marginTop: 10,
        color: 'white'
    },
    releasedate: {
        color: 'grey'
    }
});

export default MovieListCard;
