import { useNavigate, useParams } from "react-router-dom";
import c from "./ProfilePage.module.css";
import {
  UpdateUserPayload,
  useFetchUserProfile,
  useFetchUserVehicles,
  useGetUserRating,
  useGetUserReviews,
  useUpdateUser,
  useUploadImages,
} from "@api/index";
import { useToken } from "@hooks/index";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fallbackImageSvg, pencilSvg } from "@assets/images";
import { routes } from "@routes/routes";
import {
  ButtonAccent,
  DocumentsSettings,
  Footer,
  ReviewCard,
  Spinner,
  VehicleCard,
} from "@components/index";
import { ReviewCardData } from "types";

export const ProfilePage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useFetchUserProfile(userId || "");

  const { data: userRating, isLoading: isRatingLoading } = useGetUserRating(
    userId || ""
  );

  const { data: userVehicles, isLoading: isLoadingVehicles } =
    useFetchUserVehicles(userId || "");

  const { data: userReviews, isLoading: isLoadingReviews } = useGetUserReviews(
    userId || ""
  );

  const { data: tokenUser } = useToken();
  const isOwnProfile = !!tokenUser?.id && userId === tokenUser.id;

  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: uploadImages } = useUploadImages();

  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [personPhotoPreview, setPersonPhotoPreview] = useState<string | null>(
    null
  );
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (profile?.description) setDescription(profile.description);
    if (profile?.personPhoto) setPersonPhotoPreview(profile.personPhoto);
  }, [profile]);

  if (isLoading || isRatingLoading) return <Spinner />;
  if (error) return <p>Greška pri dohvaćanju profila.</p>;
  if (!profile) return <p>Korisnik nije pronađen.</p>;

  const handleSaveDescription = async () => {
    setIsSaving(true);
    await updateUser({ id: profile.id, description });
    refetch();
    setIsSaving(false);
  };

  const handleSaveBasicInfo = async () => {
    const updatePayload: UpdateUserPayload = { id: profile.id };

    if (updatedAddress.trim()) {
      updatePayload.address = updatedAddress;
    }

    if (updatedPhone.trim()) {
      updatePayload.phoneNumber = updatedPhone;
    }

    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Lozinke se ne podudaraju.");
        return;
      }

      if (newPassword.length < 8) {
        toast.error("Lozinka mora imati barem 8 znakova.");
        return;
      }

      updatePayload.password = newPassword;
    }

    if (!updatedAddress.trim() && !updatedPhone.trim() && !newPassword) {
      toast.error("Nema promjena za spremiti.");
      return;
    }

    setIsSaving(true);
    try {
      await updateUser(updatePayload);
      refetch();
    } catch (err) {
      toast.error("Greška pri spremanju promjena.");
    } finally {
      setIsSaving(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handlePersonPhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPersonPhotoPreview(URL.createObjectURL(file));

    try {
      const response = await uploadImages(file);
      if (!response?.secure_url) return;

      await updateUser({ id: profile.id, personPhoto: response.secure_url });
      refetch();
    } catch (err) {
      toast.error("Greška pri uploadu profilne slike.");
    }
  };

  return (
    <>
      <div className={c.profilePageContainer}>
        <div className={c.tabs}>
          {isOwnProfile ? (
            <>
              <button
                className={`${c.tab} ${activeTab === "profile" ? c.activeTab : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                MOJ PROFIL
              </button>
              <button
                className={`${c.tab} ${activeTab === "settings" ? c.activeTab : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                POSTAVKE RAČUNA
              </button>
            </>
          ) : (
            <button className={`${c.tab} ${c.activeTab}`}>PROFIL</button>
          )}
        </div>

        {activeTab === "profile" && (
          <div className={c.profileContainer}>
            <div className={c.profileSection1}>
              <div className={c.profilePictureWrapper}>
                <img
                  src={personPhotoPreview || fallbackImageSvg}
                  alt="Profilna slika"
                  className={c.avatar}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = fallbackImageSvg;
                  }}
                />

                {isOwnProfile && (
                  <>
                    <label htmlFor="upload-photo" className={c.editPhotoIcon}>
                      <img src={pencilSvg} alt="Uredi sliku" />
                    </label>
                    <input
                      type="file"
                      id="upload-photo"
                      className={c.hiddenInput}
                      onChange={handlePersonPhotoChange}
                    />
                  </>
                )}
              </div>
              <div className={c.profileStatsWrapper}>
                <h1>
                  {profile.firstName} {profile.lastName}
                </h1>
                {userRating && (
                  <p className={c.rating}>
                    {userRating.averageRating.toFixed(1)} ★ (
                    {userRating.reviewCount})
                  </p>
                )}
              </div>
            </div>

            <div className={c.profileSection2}>
              <div className={c.section}>
                <h2>OPIS</h2>
                {isOwnProfile ? (
                  <>
                    <textarea
                      className={c.textarea}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <ButtonAccent
                      content={isSaving ? "Spremanje..." : "Spremi promjene"}
                      onClick={handleSaveDescription}
                      disabled={isSaving}
                    />
                  </>
                ) : (
                  <div className={c.textarea}>
                    {profile.description?.trim() ? profile.description : ""}
                  </div>
                )}
              </div>

              <div className={c.section}>
                <div className={c.sectionHeader}>
                  <h2>AUTOMOBILI</h2>
                  {isOwnProfile && (
                    <img
                      src={pencilSvg}
                      alt="Uredi popis"
                      onClick={() => navigate(routes.USER_VEHICLES)}
                      className={c.editVehicleListIcon}
                    />
                  )}
                </div>

                {isLoadingVehicles ? (
                  <Spinner />
                ) : userVehicles && userVehicles.length > 0 ? (
                  <div className={c.vehiclesGrid}>
                    {userVehicles.map((v) => (
                      <VehicleCard key={v.id} vehicle={v} variant="profile" />
                    ))}
                  </div>
                ) : (
                  <p>Nije dodano nijedno vozilo.</p>
                )}
              </div>

              <div className={c.section}>
                <h2>RECENZIJE OD UNAJMLJIVAČA</h2>

                {isLoadingReviews ? (
                  <Spinner />
                ) : userReviews && userReviews.length > 0 ? (
                  <div className={c.reviewList}>
                    {userReviews.map((review: ReviewCardData) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <p>Korisnik još nema recenzija.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && isOwnProfile && (
          <div className={c.settingsContainer}>
            <div className={c.settingsBasic}>
              <div className={c.formGroup}>
                <label>Nova Lozinka</label>
                <input
                  id="password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                />
              </div>

              <div className={c.formGroup}>
                <label>Ponovi novu lozinku</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                />
              </div>

              <div className={c.formGroup}>
                <label>Adresa</label>
                <input
                  id="address"
                  name="address"
                  value={updatedAddress}
                  onChange={(e) => setUpdatedAddress(e.target.value)}
                  type="text"
                  placeholder={profile.address}
                />
              </div>

              <div className={c.formGroup}>
                <label>Broj mobitela</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={updatedPhone}
                  onChange={(e) => setUpdatedPhone(e.target.value)}
                  type="text"
                  placeholder={profile.phoneNumber}
                />
              </div>
              <div>
                <ButtonAccent
                  content="Spremi promjene"
                  onClick={handleSaveBasicInfo}
                  disabled={isSaving}
                />
              </div>
            </div>
            <div className={c.settingsDocuments}>
              <h2>Dokumenti</h2>
              <DocumentsSettings userId={profile.id} refetch={refetch} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
