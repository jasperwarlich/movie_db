import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView, Image, ScrollView } from 'react-native';
import { MovieDBService } from '../services/moviedb.service.ts';
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard.tsx';
import TabNavigator from '../navigation/TabNavigator.tsx';

export default function HomeScreen() {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const apiKey: string = process.env.EXPO_PUBLIC_TMDB_API_KEY as string;
    const service = new MovieDBService(apiKey);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await service.getPopularMovies();
                console.log(movies.results)
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
                    contentContainerStyle={styles.scrollContainer} // Ensures proper spacing
                    showsHorizontalScrollIndicator={false} // Hides the scroll indicator (optional)
                >
                    {movies.map((movie) => (
                        <MovieCard
                            movie={movie}
                        />
                    ))}
                </ScrollView>
                {/* <FlatList
          data={movies['results']}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} />
          )}
        /> */}
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
        backgroundColor: '#171f35',
        paddingHorizontal: 10,
    },
    scrollContainer: {
        paddingHorizontal: 5,  // Adds some space around the scrollable content
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        padding: 20
    }
});
