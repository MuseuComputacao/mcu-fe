import React, { useState } from 'react';
import { Image, Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link } from '@react-navigation/native';

type PostTag = 'jekyll' | 'curiosidades';
type PostFilter = 'todos' | PostTag;

type Post = {
  title: string;
  description: string;
  author: string;
  date: string;
  tag: PostTag;
  legacyPath: string;
};

// Individual article bodies remain on the documented Jekyll fallback until their
// editorial migration is authorized and implemented.
const legacySite = 'https://museucomputacao.github.io';

const normalizeSearchText = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

const posts: Post[] = [
  {
    title: 'TK3000 lle',
    description: 'TK300 lle',
    author: 'Ana Lucia Rodrigues',
    date: '29 abr. 2022',
    tag: 'curiosidades',
    legacyPath: '/curiosidades/2022/04/29/TK300-Ile.html',
  },
  {
    title: 'Nintendo Game & Watch',
    description: 'Nintendo Game & Watch',
    author: 'Ana Lucia Rodrigues',
    date: '28 abr. 2022',
    tag: 'curiosidades',
    legacyPath: '/curiosidades/2022/04/28/Nintendo-Game-&-Watch.html',
  },
  {
    title: 'Xerox Star',
    description: 'Xerox Star',
    author: 'Ana Lucia',
    date: '27 abr. 2022',
    tag: 'curiosidades',
    legacyPath: '/curiosidades/2022/04/27/xerox-star.html',
  },
  {
    title: 'Processador ARM',
    description: 'rocessador ARM',
    author: 'Ana Lucia Rodrigues',
    date: '26 abr. 2022',
    tag: 'curiosidades',
    legacyPath: '/curiosidades/2022/04/26/Processador-ARM.html',
  },
  {
    title: 'Lotus Development Corporation',
    description: 'Lotus Development Corporation',
    author: 'Ana Lucia Rodrigues',
    date: '25 abr. 2022',
    tag: 'curiosidades',
    legacyPath: '/curiosidades/2022/04/25/Lotus.html',
  },
  {
    title: 'Apple IIc.',
    description: 'Apple IIc.',
    author: 'Ana Lucia Rodrigues',
    date: '24 abr. 2022',
    tag: 'curiosidades',
    legacyPath: '/curiosidades/2022/04/24/Apple-llc.html',
  },
  {
    title: 'MS-DOS 6.22',
    description: 'MS-DOS 6.22',
    author: 'Ana Lucia Rodrigues',
    date: '13 abr. 2022',
    tag: 'curiosidades',
    legacyPath: '/curiosidades/2022/04/13/MS-DOS-6.22.html',
  },
  {
    title: 'O Micro-Soft Altair BASIC. Altair 8800',
    description: 'Hoje é o dia dele! O Micro-Soft Altair BASIC.',
    author: 'Museu Capixaba',
    date: '11 abr. 2022',
    tag: 'curiosidades',
    legacyPath: '/curiosidades/2022/04/11/microsoft-altair-basic.html',
  },
  {
    title: 'CP-500',
    description: 'CP-500',
    author: 'Ana Lucia Rodrigues',
    date: '08 abr. 2022',
    tag: 'curiosidades',
    legacyPath: '/curiosidades/2022/04/08/CP-500.html',
  },
  {
    title: 'As Placas CAMBION e os protótipos do NCE',
    description: 'Depoimento sobre as placas utilizadas na montagem de protótipos.',
    author: 'Ana Lucia Rodrigues',
    date: '08 out. 2021',
    tag: 'jekyll',
    legacyPath: '/jekyll/2021/10/08/nce-prototype-board-cambion.html',
  },
  {
    title: 'Lidando com Dados no Jekyll',
    description: 'Como lidar com formatos de dados e seu fluxo de uso no Jekyll.',
    author: 'Fábio R. Nóbrega',
    date: '07 set. 2021',
    tag: 'jekyll',
    legacyPath: '/jekyll/2021/09/07/data-with-jekyll.html',
  },
  {
    title: 'Customizando um tema no Jekyll',
    description: 'Como modificar o tema padrão do Jekyll.',
    author: 'Thiago B. Mattos',
    date: '02 set. 2021',
    tag: 'jekyll',
    legacyPath: '/jekyll/2021/09/02/change-jekyll-theme.html',
  },
];

const filters: Array<{ id: PostFilter; label: string }> = [
  { id: 'todos', label: 'Todos' },
  { id: 'curiosidades', label: 'Curiosidades' },
  { id: 'jekyll', label: 'Jekyll' },
];

const Posts = () => {
  const [selectedFilter, setSelectedFilter] = useState<PostFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const normalizedQuery = normalizeSearchText(searchQuery.trim());
  const visiblePosts = posts.filter((post) => {
    const matchesFilter = selectedFilter === 'todos' || post.tag === selectedFilter;
    const searchableText = normalizeSearchText(
      `${post.title} ${post.description} ${post.author} ${post.tag}`,
    );

    return matchesFilter && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
  const emptyStateMessage = normalizedQuery
    ? 'Nenhum artigo encontrado para esta busca.'
    : 'Nenhum artigo encontrado para este tema.';

  const openLegacyPost = (path: string) => {
    Linking.openURL(`${legacySite}${path}`).catch(() => undefined);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image
            accessibilityLabel="Ícone do Museu da Computação"
            source={require('../../../assets/museu-icon.png')}
            style={styles.logo}
          />
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>Museu da Computação</Text>
            <Text style={styles.title}>Artigos</Text>
          </View>
        </View>

        <Link to="/" style={styles.homeLink}>
          <Text style={styles.linkText}>Voltar para o início</Text>
        </Link>

        <Text style={styles.intro}>
          Explore os artigos e curiosidades publicados pelo Museu da Computação.
        </Text>

        <View style={styles.searchSection}>
          <Text style={styles.searchLabel}>Buscar artigos</Text>
          <TextInput
            accessibilityLabel="Buscar artigos"
            onChangeText={setSearchQuery}
            placeholder="Digite título, autor ou tema"
            placeholderTextColor="#5F5663"
            returnKeyType="search"
            style={styles.searchInput}
            value={searchQuery}
          />
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filtrar por tema</Text>
          <View style={styles.filterRow}>
            {filters.map((filter) => {
              const isSelected = selectedFilter === filter.id;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  key={filter.id}
                  onPress={() => setSelectedFilter(filter.id)}
                  style={[styles.filterButton, isSelected && styles.filterButtonSelected]}
                >
                  <Text style={[styles.filterText, isSelected && styles.filterTextSelected]}>
                    {filter.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text accessibilityRole="header" style={styles.resultsTitle}>
          {visiblePosts.length} {visiblePosts.length === 1 ? 'artigo' : 'artigos'}
        </Text>

        {visiblePosts.length === 0 ? (
          <Text accessibilityRole="alert" style={styles.emptyState}>
            {emptyStateMessage}
          </Text>
        ) : (
          visiblePosts.map((post) => (
            <View key={post.legacyPath} style={styles.postCard}>
              <Image
                accessibilityLabel={`Imagem de ${post.title}`}
                source={require('../../../assets/museu-icon.png')}
                style={styles.postImage}
              />
              <View style={styles.postBody}>
                <Text style={styles.postTag}>{post.tag}</Text>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postMeta}>{post.date} · {post.author}</Text>
                <Text style={styles.postDescription}>{post.description}</Text>
                <Pressable
                  accessibilityLabel={`Abrir artigo ${post.title} no site legado`}
                  accessibilityRole="link"
                  onPress={() => openLegacyPost(post.legacyPath)}
                  style={styles.readLink}
                >
                  <Text style={styles.linkText}>Continuar lendo no site legado</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Os textos completos permanecem no site legado durante esta etapa de migração.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    maxWidth: 960,
    padding: 32,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
    marginLeft: 16,
  },
  logo: {
    height: 72,
    width: 96,
  },
  eyebrow: {
    color: '#AD4A4A',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#18121E',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
  },
  homeLink: {
    alignSelf: 'flex-start',
    marginBottom: 24,
    paddingVertical: 8,
  },
  intro: {
    color: '#18121E',
    fontSize: 17,
    lineHeight: 28,
    marginBottom: 24,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchLabel: {
    color: '#18121E',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  searchInput: {
    borderColor: '#E7E0D8',
    borderRadius: 8,
    borderWidth: 1,
    color: '#18121E',
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 12,
    width: '100%',
  },
  filterSection: {
    borderTopColor: '#E7E0D8',
    borderTopWidth: 1,
    paddingTop: 20,
  },
  filterLabel: {
    color: '#18121E',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  filterButton: {
    borderColor: '#AD4A4A',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButtonSelected: {
    backgroundColor: '#AD4A4A',
  },
  filterText: {
    color: '#AD4A4A',
    fontSize: 15,
    fontWeight: '600',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  resultsTitle: {
    color: '#18121E',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  postCard: {
    borderColor: '#E7E0D8',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
  },
  postImage: {
    height: 88,
    marginRight: 16,
    width: 88,
  },
  postBody: {
    flex: 1,
  },
  postTag: {
    color: '#AD4A4A',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  postTitle: {
    color: '#18121E',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  postMeta: {
    color: '#5F5663',
    fontSize: 14,
    marginBottom: 8,
  },
  postDescription: {
    color: '#18121E',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  readLink: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  linkText: {
    color: '#AD4A4A',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  emptyState: {
    color: '#5F5663',
    fontSize: 16,
    paddingVertical: 24,
  },
  notice: {
    backgroundColor: '#F7F2EC',
    borderRadius: 10,
    marginTop: 8,
    padding: 16,
  },
  noticeText: {
    color: '#5F5663',
    fontSize: 15,
    lineHeight: 22,
  },
});

export default Posts;
