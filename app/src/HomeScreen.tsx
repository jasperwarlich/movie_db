import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView, Image, ScrollView } from 'react-native';
import { MovieDBService } from '../services/moviedb.service.ts';
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard.tsx';

export default function HomeScreen() {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const apiKey: string = process.env.EXPO_PUBLIC_TMDB_API_KEY as string;
    const service = new MovieDBService(apiKey);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await service.getPopularMovies();
                setMovies(movies.results);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, []);

    if (loading) {
        <View style={styles.centered}>
            <ActivityIndicator size="large" />
            <Text>Loading...</Text>
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Popular Movies</Text>
            <View style={styles.content}>
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.scrollContainer}
                    showsHorizontalScrollIndicator={false}>
                    {movies.map((movie) => (
                        <MovieCard
                            movie={movie}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#181818',
    },
    scrollContainer: {
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white',
        marginTop: 20,
        marginLeft: 20
    },
    content: {
        padding: 20
    }
});
