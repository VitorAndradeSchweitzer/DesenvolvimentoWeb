import { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import axios from 'axios';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-profile.png');
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    about: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    cidade: '',
    estado: '',
    pais: '',
    equipamento: '',
    especialidades: [],
    novaEspecialidade: '',
    posts: []
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get('/api/users/me');
        setFormData(prev => ({ ...prev, ...response.data }));
        setProfileImage(response.data.profileImage || '/default-profile.png');
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
      }

      try {
        const postsResponse = await axios.get('/api/users/me/posts');
        setFormData(prev => ({ ...prev, posts: postsResponse.data }));
      } catch (err) {
        console.error('Erro ao buscar posts:', err);
      }
    }
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setProfileImage(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEspecialidade = () => {
    if (formData.novaEspecialidade && !formData.especialidades.includes(formData.novaEspecialidade)) {
      setFormData(prev => ({
        ...prev,
        especialidades: [...prev.especialidades, prev.novaEspecialidade],
        novaEspecialidade: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/me', formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Erro ao salvar alterações:', err);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img src={previewImage || profileImage} alt="Foto de perfil" className={styles.profileImage} />
        {isEditing && <input type="file" onChange={handleImageChange} />}
        {!isEditing && <h2 className={styles.profileName}>{formData.fullName}</h2>}
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Salvar alterações' : 'Editar perfil'}
        </button>
      </div>

      <div className={styles.aboutMe}><p>{formData.about}</p></div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {isEditing && (
          <div className={styles.field}>
            <label>Nome completo</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>
        )}

         {isEditing && (
          <div className={styles.field}>
            <label>Sobre mim</label>
            <textarea name="about" value={formData.about} onChange={handleChange} />
          </div>
        )}
          <br></br>
          {[['CPF', 'cpf'], ['Data de nascimento', 'dataNascimento'], ['Telefone', 'telefone'],
          ['Cidade', 'cidade'], ['Estado', 'estado'], ['País', 'pais'], ['Equipamento', 'equipamento']]
          .map(([label, name]) => (
            <div key={name} className={styles.field}>
              <label>{label}</label>
              {isEditing ? (
                <input name={name} value={formData[name]} onChange={handleChange} />
              ) : (
                <p>{formData[name]}</p>
              )}
            </div>
        ))}


        <div className={styles.field}>
          <label>Especialidades</label>
          {isEditing && (
            <div>
              <input
                name="novaEspecialidade"
                value={formData.novaEspecialidade}
                onChange={handleChange}
                placeholder="Ex: Retrato, Natureza..."
              />
              <button type="button" onClick={handleAddEspecialidade}>Adicionar</button>
            </div>
          )}
          <div className={styles.tags}>
            {formData.especialidades.map((esp, i) => <span key={i} className={styles.tag}>{esp}</span>)}
          </div>
        </div>

      </form>

      <div className={styles.postsSection}>
        <h3>Criações</h3>
        <div className={styles.postsGrid}>
          {formData.posts?.slice().reverse().map(post => (
            <div key={post.id} className={styles.postCard}>
              <img src={post.imagem} alt={post.descricao} />
              <p>{post.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
