import React, { useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { MovieDBService } from '../services/moviedb.service.ts';
import MovieListCard from '../components/MovieListCard.tsx';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';

interface Movie {
    id: number;
    original_title: string;
    poster_path: string;
}

export default function SearchScreen() {
    const [search, setSearch] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const apiKey: string = process.env.EXPO_PUBLIC_TMDB_API_KEY as string;
    const service = new MovieDBService(apiKey);
    const sheetRef = useRef<BottomSheetMethods>(null);


    const updateSearch = async (search: string) => {
        console.log(search)
        setSearch(search as string);
        setLoading(true);
        try {
            const movies = await service.searchByKeyword(search as string);
            setMovies(movies.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMoviePress = (movie: Movie) => {
        setSelectedMovie(movie); // Set selected movie
        sheetRef.current?.open(); // Open BottomSheet
    };

    const renderMovie = ({ item }: { item: Movie }) => (
        <TouchableOpacity onPress={() => handleMoviePress(item)}>
            <MovieListCard movie={item} />
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false}>
                <View style={styles.container}>
                    <SearchBar
                        placeholder="Search movie..."
                        onChangeText={updateSearch}
                        value={search}
                        darkTheme
                        round
                        containerStyle={styles.searchBarContainer}
                        inputContainerStyle={styles.searchBarInputContainer}
                        inputStyle={styles.searchBarInput}
                        loadingProps={{ animating: loading }}
                    />
                    <FlatList
                        data={movies}
                        renderItem={renderMovie}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>
            </ScrollView>
            <BottomSheet ref={sheetRef} style={styles.bottomSheetContainer}>
                <View >
                    <Text>
                        {selectedMovie?.original_title}
                    </Text>
                </View>
            </BottomSheet>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        padding: 20,
        backgroundColor: 'grey'
    },
    container: {
        flex: 1,
        backgroundColor: '#181818',
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
    },
    searchBarInputContainer: {
        backgroundColor: '#333',
        borderRadius: 10,
        height: 40,
    },
    searchBarInput: {
        color: '#fff',
    },
    flatListContainer: {
        padding: 10,
    },
    movieCard: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
        height: 200,
        backgroundColor: 'blue'
    },
    posterImage: {
        width: 200,
        height: 300,
        borderRadius: 10,
    },
    movieTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
