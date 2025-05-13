import { useParams } from "react-router-dom";
import c from "./ProfilePage.module.css";
import { useFetchUserProfile, useUpdateUser } from "@api/index";
import { useToken } from "@hooks/index";
import { useEffect, useState } from "react";

export const ProfilePage = () => {
  const { id: userId } = useParams();
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useFetchUserProfile(userId || "");

  const { data: tokenUser } = useToken();
  const isOwnProfile = !!tokenUser?.id && userId === tokenUser.id;

  const { mutateAsync: updateUser } = useUpdateUser();

  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.description) setDescription(profile.description);
  }, [profile]);

  if (isLoading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška pri dohvaćanju profila.</p>;
  if (!profile) return <p>Korisnik nije pronađen.</p>;

  const handleSaveDescription = async () => {
    setIsSaving(true);
    await updateUser({ id: profile.id, description });
    refetch();
    setIsSaving(false);
  };

  return (
    <div className={c.profileContainer}>
      <div className={c.tabs}>
        {isOwnProfile && (
          <>
            <button className={c.tab}>Moj profil</button>
            <button className={c.tab}>Postavke računa</button>
          </>
        )}
      </div>

      <div className={c.section}>
        <img
          src={profile.personPhoto}
          alt="Profilna slika"
          className={c.avatar}
        />
        <h2>
          {profile.firstName} {profile.lastName}
        </h2>
        {/* TODO:  lokacija + rating */}
      </div>

      <div className={c.section}>
        <h3>Opis</h3>
        {isOwnProfile ? (
          <>
            <textarea
              className={c.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSaveDescription} disabled={isSaving}>
              {isSaving ? "Spremanje..." : "Spremi promjene"}
            </button>
          </>
        ) : (
          <p>{profile.description?.trim() ? profile.description : ""}</p>
        )}
      </div>

      <div className={c.section}>
        <h3>Automobili</h3>
        {/* TODO: render vozila */}
      </div>

      <div className={c.section}>
        <h3>Recenzije od unajmljivača</h3>
        {/* TODO: render recenzija */}
      </div>
    </div>
  );
};
