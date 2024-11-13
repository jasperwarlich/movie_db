import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';

interface MovieCardProps {
    movie: any;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.poster} resizeMode="contain" />
            <Text style={styles.title}>{movie.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        // backgroundColor: 'black',
        width: 200,
        height: 500,
        borderRadius: 10,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        marginRight: 10
    },
    poster: {
        width: '100%',
        height: 400,
        marginTop: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        margin: 0,
    },

});

export default MovieCard;